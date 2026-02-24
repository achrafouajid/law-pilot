"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
    ArrowRight, UploadCloud, CheckCircle2, FileText,
    ChevronLeft, Search, Shield, File, X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import servicesData from "@/public/immigration-services.json";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { finalizeApplication } from "@/lib/storage";

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
        <Suspense fallback={<div className="min-h-screen hero-bg pt-[72px]" />}>
            <ApplyContent />
        </Suspense>
    );
}

function ApplyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("service") as CategoryKey | null;
    const { user, setPendingCase, pendingFiles, setPendingFiles, sessionId, setSessionId } = useStore();

    // -- State --
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(initialCategory || null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requirements, setRequirements] = useState<{ id: string, name: string, category: string }[]>([]);

    // Initialize session ID if not present
    useEffect(() => {
        if (!sessionId) {
            const newSessionId = uuidv4();
            setSessionId(newSessionId);
        }
    }, [sessionId, setSessionId]);

    // Fetch requirements when service is selected
    useEffect(() => {
        if (selectedService) {
            const fetchRequirements = async () => {
                const { getDocumentRequirements } = await import("@/lib/storage");
                const reqs = await getDocumentRequirements(selectedService.case_type);
                if (reqs && reqs.length > 0) {
                    setRequirements(reqs.map(r => ({ id: r.id, name: r.name, category: r.category })));
                } else {
                    // Fallback to defaults if no requirements found in DB
                    setRequirements([
                        { id: "doc-1", name: "Passport (Biographical Page)", category: "Identification" },
                        { id: "doc-2", name: "Birth Certificate", category: "Civil Document" },
                        { id: "doc-3", name: "Previous Visa / Exit Stamps (if any)", category: "Supporting" },
                    ]);
                }
            };
            fetchRequirements();
        }
    }, [selectedService]);

    // -- Derived Data --
    const checklist = useMemo(() => {
        return requirements.map(f => {
            const pending = pendingFiles.find(p => p.id === f.id);
            if (pending) {
                return { ...f, uploaded: true, name: pending.file.name, requiredType: f.category };
            }
            return { ...f, uploaded: false, requiredType: f.category };
        });
    }, [requirements, pendingFiles]);

    const allServices = useMemo(() => {
        if (!selectedCategory) return [];
        return servicesData.immigration_services[selectedCategory].services as Service[];
    }, [selectedCategory]);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return allServices;
        return allServices.filter(s => s.case_type.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [allServices, searchQuery]);

    const progressCount = checklist.filter(f => f.uploaded).length;
    const progressPercent = (progressCount / checklist.length) * 100;

    // -- Handlers --
    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFileSelection = (docId: string, file: File) => {
        if (!selectedService) return;

        // Store the file in Zustand (non-persisted)
        const updatedPending = [...pendingFiles.filter(p => p.id !== docId), {
            id: docId,
            file,
            caseType: selectedService.case_type
        }];
        setPendingFiles(updatedPending);

        toast.success(`${file.name} selected`);
    };

    const handleRemove = (docId: string) => {
        setPendingFiles(pendingFiles.filter(p => p.id !== docId));
    };

    const submitApplication = async () => {
        if (!selectedService) return;

        // Save to global store so we can retrieve it after login (if needed)
        setPendingCase({
            serviceId: selectedCategory as string,
            caseType: selectedService.case_type,
            files: checklist.map(f => ({ id: f.id, name: f.name, uploaded: f.uploaded })),
        });

        if (user) {
            setIsSubmitting(true);
            try {
                await finalizeApplication(user.id, selectedService.case_type, pendingFiles);
                setPendingCase(null);
                setPendingFiles([]);
                toast.success("Your application has been submitted successfully!");
                router.push("/dashboard");
            } catch (error) {
                console.error("Failed to submit application:", error);
                toast.error("Failed to submit application. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // Redirect to signup
            router.push("/signup?intent=apply");
        }
    };

    return (
        <div className="min-h-screen hero-bg" style={{ paddingTop: "72px" }}>
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
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#000042] mb-4 tracking-[-0.02em]">
                                What type of immigration <br />case do you need?
                            </h1>
                            <p className="text-[#6b6b7e] text-[1.05rem] leading-relaxed max-w-[500px] mx-auto">
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
                                                ? 'bg-[rgba(216,178,61,0.1)] border-[rgba(216,178,61,0.4)] text-[#b6912c]'
                                                : 'bg-transparent border-transparent text-[#6b6b7e] hover:bg-[rgba(0,0,66,0.04)] hover:text-[#000042]'
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
                                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(0,0,66,0.3)]" />
                                            <Input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={`Search ${CATEGORIES.find(c => c.id === selectedCategory)?.label}...`}
                                                className="pl-10 bg-white border-[rgba(0,0,66,0.1)] text-[#000042] focus:border-[#d8b23d]"
                                            />
                                        </div>

                                        {/* List */}
                                        <div className="space-y-3">
                                            {filteredServices.length > 0 ? filteredServices.map((service, i) => (
                                                <Card
                                                    key={i}
                                                    variant="elevated"
                                                    className="p-5 cursor-pointer hover:border-[rgba(216,178,61,0.3)] transition-all duration-200 group flex items-center justify-between"
                                                    onClick={() => handleServiceSelect(service)}
                                                >
                                                    <div className="pr-4">
                                                        <h3 className="text-[#000042] font-serif text-[1.1rem] font-bold tracking-tight mb-2 group-hover:text-[#b6912c] transition-colors">
                                                            {service.case_type}
                                                        </h3>
                                                        <div className="flex items-center gap-3 text-xs opacity-70">
                                                            <Badge variant="info" className="!bg-[rgba(84,132,140,0.1)] !text-[#54848c] !border-transparent">
                                                                {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                                            </Badge>
                                                            <span className="text-[#6b6b7e]">
                                                                {service.attorney_fees_usd.starting_from && `From $${service.attorney_fees_usd.starting_from}`}
                                                                {service.attorney_fees_usd.flat_fee && `Flat Fee: $${service.attorney_fees_usd.flat_fee}`}
                                                                {service.attorney_fees_usd.hourly_rate && `$${service.attorney_fees_usd.hourly_rate}/hr`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-[rgba(0,0,66,0.05)] flex items-center justify-center group-hover:bg-[#d8b23d] transition-colors shrink-0">
                                                        <ArrowRight size={14} className="text-[#6b6b7e] group-hover:text-[#000042]" />
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
                                    <div className="h-full flex flex-col items-center justify-center py-20 border border-dashed border-[rgba(0,0,66,0.1)] rounded-xl bg-[rgba(0,0,66,0.02)] text-center px-6">
                                        <FileText size={32} className="text-[rgba(0,0,66,0.2)] mb-4" />
                                        <h3 className="text-[#000042] font-medium mb-1">Select a category</h3>
                                        <p className="text-sm text-[#6b6b7e]">Choose an immigration category from the left to view available services.</p>
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
                        <Card variant="elevated" className="p-6 md:p-8 mb-8 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#000042] mb-2 tracking-[-0.03em]">
                                        {selectedService.case_type}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="info" className="!bg-[rgba(84,132,140,0.1)] !text-[#54848c]">
                                            {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                        </Badge>
                                        <span className="text-[#6b6b7e] text-[0.85rem] font-medium">
                                            Case ID: {sessionId?.slice(0, 8).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2 bg-[rgba(216,178,61,0.1)] text-[#b6912c] px-3 py-1.5 rounded-full border border-[rgba(216,178,61,0.2)]">
                                        <Shield size={14} />
                                        <span className="text-[0.75rem] font-bold uppercase tracking-wider">Secure Upload</span>
                                    </div>
                                    <span className="text-[0.7rem] text-[#6b6b7e] italic">Your data is encrypted in transit</span>
                                </div>
                            </div>
                        </Card>

                        {/* Document Checklist */}
                        <h2 className="text-2xl font-serif font-bold text-[#000042] mb-2">Required Documentation</h2>
                        <p className="text-[#6b6b7e] text-[0.95rem] mb-8 leading-relaxed max-w-[600px]">
                            To provide the best legal strategy, please provide clear, original-quality digital copies (PDF or high-res JPG) of the items below.
                        </p>

                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-[#b6912c] mb-2 uppercase tracking-wide">
                                <span>Upload Progress</span>
                                <span>{progressCount > 0 ? `${Math.floor(progressPercent)}%` : '0%'}</span>
                            </div>
                            <Progress value={progressPercent} showValue={false} variant="gold" className="h-2 bg-[rgba(0,0,66,0.1)]" />
                        </div>

                        {/* Document List */}
                        <div className="space-y-4 mb-10">
                            {checklist.map(doc => (
                                <Card
                                    key={doc.id}
                                    className={`border transition-all duration-300 ${doc.uploaded
                                        ? 'bg-[rgba(216,178,61,0.05)] border-[rgba(216,178,61,0.3)]'
                                        : 'bg-white border-[rgba(0,0,66,0.1)] hover:border-[rgba(0,0,66,0.2)] shadow-sm'
                                        }`}
                                >
                                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-0.5">
                                                {doc.uploaded ? (
                                                    <CheckCircle2 size={20} className="text-[#b6912c]" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border border-[rgba(0,0,66,0.2)] flex items-center justify-center text-[9px] text-[#6b6b7e] font-bold">
                                                        !
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-[0.95rem] font-bold text-[#000042] mb-1">{doc.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[0.8rem] text-[#6b6b7e]">Requirement: {doc.requiredType}</span>
                                                    {doc.uploaded && <Badge variant="gold" className="text-[0.65rem] !py-0.5 !px-1.5 h-auto leading-none">Uploaded</Badge>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            {doc.uploaded ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemove(doc.id)}
                                                    className="text-[#6b6b7e] hover:text-[#ff5c5c] hover:bg-[rgba(255,92,92,0.1)] text-xs h-8"
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
                                                            if (file) handleFileSelection(doc.id, file);
                                                        }}
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-[#000042] border-[rgba(0,0,66,0.2)] hover:bg-[rgba(0,0,66,0.05)] w-full md:w-auto h-9"
                                                        onClick={() => document.getElementById(doc.id)?.click()}
                                                    >
                                                        <UploadCloud size={14} className="mr-2" />
                                                        Upload File
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Bottom Disclaimer + Next Step */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-white border border-[rgba(0,0,66,0.1)] shadow-sm">
                            <div className="flex items-start gap-3">
                                <Shield size={20} className="text-[#54848c] shrink-0 mt-0.5" />
                                <p className="text-[0.85rem] text-[#6b6b7e] leading-relaxed max-w-[400px]">
                                    Your files are encrypted securely via TLS. In the next step, you will crerate your client portal account to officially submit your application and track progress.
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full md:w-auto shrink-0 font-bold bg-[#d8b23d] text-[#000042] hover:bg-[#dcc07f]"
                                onClick={submitApplication}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : (user ? "Submit my case" : "Create Account & Submit")} <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
