import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadDocument(file: File, path: string) {
    const { data, error } = await supabase.storage
        .from('documents')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw error;
    }

    return data;
}

export async function getSignedUrl(path: string) {
    const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(path, 60 * 60); // 1 hour

    if (error) {
        throw error;
    }

    return data.signedUrl;
}

/**
 * Handles guest uploads before login
 */
export async function uploadGuestDocument(file: File, sessionId: string, caseType: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `guests/${sessionId}/${fileName}`;

    // 1. Upload to storage
    const { error: storageError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

    if (storageError) throw storageError;

    // 2. Record in guest_documents table
    const { error: dbError } = await supabase
        .from('guest_documents')
        .insert({
            session_id: sessionId,
            name: file.name,
            file_path: filePath,
            file_type: file.type,
            case_type: caseType,
        });

    if (dbError) throw dbError;

    return filePath;
}

export async function associateGuestDocuments(sessionId: string, userId: string) {
    // 1. Find all guest documents for this session
    const { data: guestDocs, error: fetchError } = await supabase
        .from('guest_documents')
        .select('*')
        .eq('session_id', sessionId);

    if (fetchError || !guestDocs || guestDocs.length === 0) return;

    // 2. We assume they all belong to the same case type for the guest flow
    const caseType = guestDocs[0].case_type;

    // 3. Create a new case for the user
    const { data: caseData, error: caseError } = await supabase
        .from('cases')
        .insert({
            client_id: userId,
            title: `${caseType} Application`,
            category: 'immigration', // generic for now
            service_type: caseType,
            status: 'pending',
        })
        .select()
        .single();

    if (caseError) throw caseError;

    // 4. Create document records for the user
    const documentsToInsert = guestDocs.map(gd => ({
        case_id: caseData.id,
        name: gd.name,
        file_path: gd.file_path,
        file_type: gd.file_type,
        status: 'pending'
    }));

    const { error: docError } = await supabase
        .from('documents')
        .insert(documentsToInsert);

    if (docError) throw docError;

    // 5. Cleanup guest records
    await supabase
        .from('guest_documents')
        .delete()
        .eq('session_id', sessionId);
}
