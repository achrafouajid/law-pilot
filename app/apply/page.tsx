"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
    ArrowRight, UploadCloud, CheckCircle2, FileText,
    ChevronLeft, Search, Shield, Info, File, X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import servicesData from "@/public/immigration-services.json";
import { uploadGuestDocument } from "@/lib/storage";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner"; // Assuming sonner is available or will be added

// Types derived from JSON
type CategoryKey = keyof typeof servicesData.immigration_services;
type Service = {
    case_type: string;
    attorney_fees_usd: {
        starting_from?: number;
        flat_fee?: number;
        hourly_rate?: number;
        additional_family_member_fee?: number;
    };
};

const CATEGORIES: { id: CategoryKey; label: string }[] = [
    { id: "family_based_immigration", label: "Family-Based Immigration" },
    { id: "employment_based_immigration", label: "Employment-Based Immigration" },
    { id: "work_and_investor_visas", label: "Work & Investor Visas" },
    { id: "asylum_and_humanitarian_cases", label: "Asylum & Humanitarian Cases" },
    { id: "other_immigration_services", label: "Other Immigration Services" },
];

export default function ApplyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen hero-bg-dark pt-[72px]" />}>
            <ApplyContent />
        </Suspense>
    );
}

function ApplyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("service") as CategoryKey | null;
    const { setPendingCase } = useStore();

    // -- State --
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(initialCategory || null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { sessionId, setSessionId } = useStore();
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    // Initialize session ID if not present
    useEffect(() => {
        if (!sessionId) {
            const newSessionId = uuidv4();
            setSessionId(newSessionId);
        }
    }, [sessionId, setSessionId]);

    // Fake file state
    const [files, setFiles] = useState<{ id: string; name: string; size: number; requiredType: string; uploaded: boolean }[]>([
        { id: "doc-1", name: "Passport (Biographical Page)", size: 0, requiredType: "Identification", uploaded: false },
        { id: "doc-2", name: "Birth Certificate", size: 0, requiredType: "Civil Document", uploaded: false },
        { id: "doc-3", name: "Previous Visa / Exit Stamps (if any)", size: 0, requiredType: "Supporting", uploaded: false },
    ]);

    // -- Derived Data --
    const allServices = useMemo(() => {
        if (!selectedCategory) return [];
        return servicesData.immigration_services[selectedCategory].services as Service[];
    }, [selectedCategory]);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return allServices;
        return allServices.filter(s => s.case_type.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [allServices, searchQuery]);

    const progressCount = files.filter(f => f.uploaded).length;
    const progressPercent = (progressCount / files.length) * 100;

    // -- Handlers --
    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRealUpload = async (docId: string, file: File) => {
        if (!sessionId || !selectedService) return;

        setUploadingId(docId);
        try {
            const filePath = await uploadGuestDocument(file, sessionId, selectedService.case_type);

            setFiles(prev => prev.map(f => f.id === docId ? {
                ...f,
                uploaded: true,
                name: file.name,
                path: filePath // store the path for later reference
            } : f));

            toast.success(`${file.name} uploaded successfully`);
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload document");
        } finally {
            setUploadingId(null);
        }
    };

    const handleFakeRemove = (docId: string) => {
        setFiles(prev => prev.map(f => f.id === docId ? { ...f, uploaded: false, name: f.name.replace("uploaded_", "").replace(".pdf", "") } : f));
    };

    const submitApplication = () => {
        // Save to global store so we can retrieve it after login
        if (selectedService) {
            setPendingCase({
                serviceId: selectedCategory as string,
                caseType: selectedService.case_type,
                files: files.map(f => ({ id: f.id, name: f.name, uploaded: f.uploaded })),
            });
        }
        // Redirect to signup
        router.push("/signup?intent=apply");
    };

    return (
        <div className="min-h-screen hero-bg-dark" style={{ paddingTop: "72px" }}>
            {/* ── Progress Header ── */}
            <div className="sticky top-[72px] z-40 bg-[rgba(0,0,66,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] py-4">
                <div className="container-lp flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 1 ? 'bg-[#d8b23d] text-[#000042]' : 'bg-[rgba(216,178,61,0.2)] text-[#d8b23d]'}`}
                            >
                                1
                            </div>
                            <span className={`text-sm font-medium ${step === 1 ? 'text-white' : 'text-[#c2ddd8]'}`}>Select Case</span>
                        </div>
                        {/* Divider */}
                        <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.15)]" />

                        <div className="flex items-center gap-2">
                            <div
                                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 2 ? 'bg-[#d8b23d] text-[#000042]' : 'bg-[rgba(216,178,61,0.2)] text-[#d8b23d]'}`}
                            >
                                2
                            </div>
                            <span className={`text-sm font-medium ${step === 2 ? 'text-white' : 'text-[#c2ddd8]'}`}>Upload Documents</span>
                        </div>
                    </div>

                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]">
                            Cancel & Return Home
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container-lp py-12 md:py-20">

                {/* ═══════════════════════════════════════════════════════════
            STEP 1: SELECT CASE TYPE
            ═══════════════════════════════════════════════════════════ */}
                {step === 1 && (
                    <div className="animate-fade-up max-w-[800px] mx-auto">
                        <div className="text-center mb-10">
                            <span className="mono-label !text-[rgba(220,192,127,0.7)] mb-4 block">STEP 1 OF 2</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
                                What type of immigration <br />case do you need?
                            </h1>
                            <p className="text-[#c2ddd8] text-[1.05rem] leading-relaxed max-w-[500px] mx-auto opacity-80">
                                Select a category and case type to generate your personalized document checklist.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-[260px_1fr] gap-8">
                            {/* Category Sidebar */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-widest text-[#54848c] uppercase mb-2">Categories</span>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setSearchQuery(""); }}
                                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border
                      ${selectedCategory === cat.id
                                                ? 'bg-[rgba(216,178,61,0.1)] border-[rgba(216,178,61,0.4)] text-[#d8b23d]'
                                                : 'bg-transparent border-transparent text-[#9d9daa] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Service List */}
                            <div>
                                {selectedCategory ? (
                                    <>
                                        {/* Search */}
                                        <div className="relative mb-6">
                                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)]" />
                                            <Input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={`Search ${CATEGORIES.find(c => c.id === selectedCategory)?.label}...`}
                                                className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-white focus:border-[#d8b23d]"
                                            />
                                        </div>

                                        {/* List */}
                                        <div className="space-y-3">
                                            {filteredServices.length > 0 ? filteredServices.map((service, i) => (
                                                <Card
                                                    key={i}
                                                    className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-5 cursor-pointer hover:bg-[rgba(216,178,61,0.04)] hover:border-[rgba(216,178,61,0.3)] transition-all duration-200 group flex items-center justify-between"
                                                    onClick={() => handleServiceSelect(service)}
                                                >
                                                    <div className="pr-4">
                                                        <h3 className="text-white font-serif text-[1.1rem] font-bold tracking-tight mb-2 group-hover:text-[#d8b23d] transition-colors">
                                                            {service.case_type}
                                                        </h3>
                                                        <div className="flex items-center gap-3 text-xs opacity-70">
                                                            <Badge variant="info" className="!bg-[rgba(84,132,140,0.15)] !text-[#c2ddd8] !border-transparent">
                                                                {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                                            </Badge>
                                                            <span className="text-[#9d9daa]">
                                                                {service.attorney_fees_usd.starting_from && `From $${service.attorney_fees_usd.starting_from}`}
                                                                {service.attorney_fees_usd.flat_fee && `Flat Fee: $${service.attorney_fees_usd.flat_fee}`}
                                                                {service.attorney_fees_usd.hourly_rate && `$${service.attorney_fees_usd.hourly_rate}/hr`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#d8b23d] transition-colors shrink-0">
                                                        <ArrowRight size={14} className="text-[#9d9daa] group-hover:text-[#000042]" />
                                                    </div>
                                                </Card>
                                            )) : (
                                                <div className="text-center py-10 text-[#9d9daa] text-sm">
                                                    No services match your search.
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center py-20 border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl bg-[rgba(255,255,255,0.01)] text-center px-6">
                                        <FileText size={32} className="text-[rgba(255,255,255,0.1)] mb-4" />
                                        <h3 className="text-white font-medium mb-1">Select a category</h3>
                                        <p className="text-sm text-[#9d9daa]">Choose an immigration category from the left to view available services.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════
            STEP 2: UPLOAD DOCUMENTS
            ═══════════════════════════════════════════════════════════ */}
                {step === 2 && selectedService && (
                    <div className="animate-fade-up max-w-[800px] mx-auto">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d8b23d] hover:text-white mb-8 transition-colors"
                        >
                            <ChevronLeft size={14} /> Back to Services
                        </button>

                        {/* Case Info Card */}
                        <Card className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] p-6 md:p-8 mb-8 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-[-0.02em]">
                                        {selectedService.case_type}
                                    </h1>
                                    <span className="text-[#c2ddd8] text-sm font-medium opacity-80">
                                        {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-[rgba(84,132,140,0.1)] text-[#c2ddd8] px-3 py-1.5 rounded-md border border-[rgba(84,132,140,0.2)]">
                                    <Info size={14} />
                                    <span className="text-[0.8rem] font-medium">Auto-saved to temporary session</span>
                                </div>
                            </div>
                        </Card>

                        {/* Document Checklist */}
                        <h2 className="text-xl font-serif font-bold text-white mb-4">Initial Document Checklist</h2>
                        <p className="text-[#9d9daa] text-sm mb-6">
                            Please upload clear, legible copies of the following documents. You can upload more later, but these are required to open your case file.
                        </p>

                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-[#b6912c] mb-2 uppercase tracking-wide">
                                <span>Upload Progress</span>
                                <span>{progressCount} of {files.length} Completed</span>
                            </div>
                            <Progress value={progressPercent} variant="gold" className="h-2 bg-[rgba(255,255,255,0.1)]" />
                        </div>

                        {/* Document List */}
                        <div className="space-y-4 mb-10">
                            {files.map(doc => (
                                <Card
                                    key={doc.id}
                                    className={`border transition-all duration-300 ${doc.uploaded
                                        ? 'bg-[rgba(216,178,61,0.03)] border-[rgba(216,178,61,0.3)]'
                                        : 'bg-transparent border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                                        }`}
                                >
                                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-0.5">
                                                {doc.uploaded ? (
                                                    <CheckCircle2 size={20} className="text-[#d8b23d]" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-[9px] text-[#9d9daa] font-bold">
                                                        !
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-[0.95rem] font-bold text-white mb-1">{doc.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[0.8rem] text-[#9d9daa]">Requirement: {doc.requiredType}</span>
                                                    {doc.uploaded && <Badge variant="gold" className="text-[0.65rem] !py-0.5 !px-1.5 h-auto leading-none">Uploaded</Badge>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            {doc.uploaded ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleFakeRemove(doc.id)}
                                                    className="text-[#9d9daa] hover:text-[#ff5c5c] hover:bg-[rgba(255,92,92,0.1)] text-xs h-8"
                                                >
                                                    <X size={13} className="mr-1.5" /> Remove
                                                </Button>
                                            ) : (
                                                <div>
                                                    {/* Fake Upload Button */}
                                                    <input
                                                        type="file"
                                                        id={doc.id}
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleRealUpload(doc.id, file);
                                                        }}
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={uploadingId === doc.id}
                                                        className="text-white border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)] w-full md:w-auto h-9"
                                                        onClick={() => document.getElementById(doc.id)?.click()}
                                                    >
                                                        {uploadingId === doc.id ? (
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                        ) : (
                                                            <UploadCloud size={14} className="mr-2" />
                                                        )}
                                                        {uploadingId === doc.id ? "Uploading..." : "Upload File"}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Bottom Disclaimer + Next Step */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)]">
                            <div className="flex items-start gap-3">
                                <Shield size={20} className="text-[#54848c] shrink-0 mt-0.5" />
                                <p className="text-[0.85rem] text-[#9d9daa] leading-relaxed max-w-[400px]">
                                    Your files are encrypted securely via TLS. In the next step, you will crerate your client portal account to officially submit your application and track progress.
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full md:w-auto shrink-0 font-bold bg-[#d8b23d] text-[#000042] hover:bg-[#dcc07f]"
                                onClick={submitApplication}
                            >
                                Create Account & Submit <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
