"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Edit2, Trash2, LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";


export default function DashboardPage() {
    const supabase = createClient();
    useEffect(() => {
        async function showPage() {
            const { data: { user } } = await supabase.auth.getUser();
            if(!user) window.location.href = "/admin/login";
        }

        showPage();
    }, []);

    const [news, setNews] = useState<any[]>([]);
    const [newsImages, setNewsImages] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showDialog, setShowDialog] = useState<any>(null);
    const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const dropRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // News
    async function getNews() {
        const { data: newsData } = await supabase.from('news').select();
        if (newsData && newsData.length > 0) {
            setNews(newsData);
        }
    }
    useEffect(() => {
        getNews();
    }, [setShowForm]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const handleSubmit = async () => {
        setErrorMsg("");
        setLoading(true);

        if (!title || !description) {
            setErrorMsg("Titre et description requis.");
            setLoading(false);
            return;
        }

        try {
            const supported = images.filter(img =>
                ["jpg"].some(ext =>
                    img.name.toLowerCase().endsWith(ext)
                )
            );

            const uploadResults = await Promise.all(
                supported.map(async img => {
                    const resp = await uploadImage(img);
                    return resp;
                })
            );

            const uploadImg = uploadResults.filter(Boolean);

            const { error } = await supabase
                .from("news")
                .insert({
                    title: title,
                    description: description,
                    message: message,
                    images: uploadImg
                });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            setTitle("");
            setDescription("");
            setMessage("");
            setImages([]);
            setShowForm(false);
            redirect(window.location.href);
            
        } catch (err: any) {
            setErrorMsg(err.message || "Erreur lors de l'enregistrement.");
        } finally {
            getNews();
            setErrorMsg('');
        }

        setLoading(false);
    };

    const handleDelete = async (item: any) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from("news")
                .delete()
                .eq("id", item.id);

            if (error) {
                console.error("Delete error:", error);
                alert("Erreur lors de la suppression.");
                return;
            }

            // if (item.images && Array.isArray(item.images)) {
            //     for (const imgUrl of item.images) {
            //         const path = imgUrl.split("/public/")[1];

            //         await supabase.storage
            //             .from("Diocese Doume")
            //             .remove([path]);
            //     }
            // }

            getNews();

            console.log("News supprimée !");
        } catch (e) {
            console.error("Erreur:", e);
        }finally {
            setLoading(false);
        }
    };


    async function uploadImage(image: File) {
        const { data: dataE, error } = await supabase
            .storage
            .from('Diocese Doume')
            .exists(`news/${image.name}`);
        
        if(!dataE) {
            try {
                // Demander à Supabase une URL signée pour upload
                const { data, error } = await supabase.storage
                    .from("Diocese Doume")
                    .createSignedUploadUrl(`news/${image.name}`);

                if (error) {
                    setErrorMsg(error.message);
                    return null;
                }
                const uploadUrl = data.signedUrl;

                // Envoyer avec XMLHttpRequest pour suivre la progression
                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    xhr.open("PUT", uploadUrl);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const percent = Math.round((event.loaded / event.total) * 100);

                            setUploadProgress(prev => ({
                                ...prev,
                                [image.name]: percent
                            }));
                        }
                    };

                    xhr.onload = () => {
                        setUploadProgress(prev => ({
                            ...prev,
                            [image.name]: 100
                        }));
                        resolve();
                    };

                    xhr.onerror = () => reject(new Error("Erreur upload"));
                    xhr.send(image);
                });
            } catch(error: any) {
                setErrorMsg(error.message);
                return null;
            }
            // const { data, error } = await supabase
            //     .storage
            //     .from('Diocese Doume')
            //     .upload(`news/${image.name}`, image, {
            //         cacheControl: '3600',
            //         upsert: false
            //     });
            // if(error) setErrorMsg(error.message);
        }

        const { data } = supabase
            .storage
            .from('Diocese Doume')
            .getPublicUrl(`news/${image.name}`);
        if(data) return data.publicUrl;
        else return null;
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files);
        setImages((prev) => [...prev, ...newImages]);
    };

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const files = e.dataTransfer.files;
        if (!files) return;

        const newImages = Array.from(files);
        setImages((prev) => [...prev, ...newImages]);
    };

    const closeDialog = () => setShowDialog(null);

    return (
        <div className="container min-h-screen p-6">
            {/* Liste des nouvelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onClick={() => setShowDialog(item)}
                            className="relative backdrop-blur-2xl rounded-xl border border-ring p-2 pb-7 shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
                        >
                            {/* Image */}
                            {item.images[0] ? (
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="w-full h-40 object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-40 flex items-center justify-center">
                                    <p className="text-sm">Aucune image</p>
                                </div>
                            )}

                            {/* Contenu */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-foreground/70 text-sm mt-1 line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            {/* Boutons Edit / Delete */}
                            <div className="absolute bottom-2 right-2 flex gap-2">
                                {/* <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Edit", item.id);
                                    }}
                                    className="p-1 rounded-full bg-transparent hover:bg-footer transition"
                                    disabled={loading}
                                >
                                    <Edit2 className="w-5 h-5 text-primary" />
                                </button> */}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item);
                                    }}
                                    className="p-1 rounded-full bg-transparent hover:bg-footer transition"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 text-destructive" /> : <Trash2 className="w-5 h-5 text-destructive" />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bouton flottant */}
            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-18 right-6 bg-footer text-white p-4 rounded-full shadow-lg hover:rotate-90 hover:bg-primary/80 transition"
            >
                <Plus size={28} />
            </button>

            <button
                onClick={handleLogout}
                className="fixed z-10 bottom-0 right-6 p-4 rounded-full shadow-lg bg-transparent border border-destructive hover:bg-destructive transition"
            >
                <LogOut size={28} />
            </button>

            {/* Dialog détails */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-transparent rounded-xl w-full max-w-4xl shadow-xl relative flex flex-col md:flex-row gap-6">
                        
                        {/* Bouton fermer */}
                        <button
                            onClick={closeDialog}
                            className="absolute top-3 right-3 text-foreground hover:rotate-90 hover:text-destructive transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Colonne gauche : Images */}
                        <div className="md:w-1/2 grid grid-cols-2 gap-3 overflow-y-auto max-h-[70vh]">
                            {showDialog.images?.length > 0 ? (
                                showDialog.images.map((img: string, i: number) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`Image ${i + 1}`}
                                        className="rounded-md border shadow-sm object-cover w-full h-48"
                                    />
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-full border rounded-md">
                                    <p className="text-sm text-foreground/60">Aucune image</p>
                                </div>
                            )}
                        </div>

                        {/* Colonne droite : Titre et description */}
                        <div className="md:w-1/2 flex flex-col bg-background rounded-2xl p-4">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">{showDialog.title}</h2>
                            <p className="text-foreground/80 whitespace-pre-line mb-2 text-right font-semibold">{showDialog.message}</p>
                            <p className="text-foreground/80 whitespace-pre-line text-justify">{showDialog.description}</p>
                        </div>

                    </div>
                </div>
            )}


            {/* Formulaire d'ajout */}
            {showForm && (
                <div className="fixed top-15 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-transparent rounded-xl shadow-xl w-full max-w-5xl relative flex flex-col md:flex-row gap-6 p-6">

                        {/* Bouton fermer */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-foreground hover:text-destructive hover:rotate-90 transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Colonne gauche : Formulaire */}
                        <div className="md:w-1/2 flex flex-col bg-background p-4 rounded-xl gap-4">
                            <h2 className="text-xl font-bold mb-2">Ajouter une nouvelle</h2>

                            <div>
                                <label className="text-sm text-foreground">Titre</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-lg bg-background"
                                    placeholder="Nom de la nouvelle"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-foreground">Message</label>
                                <textarea
                                    rows={2}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-lg bg-background"
                                    placeholder="Message..."
                                />
                            </div>

                            <div>
                                <label className="text-sm text-foreground">Description</label>
                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-lg bg-background"
                                    placeholder="Description..."
                                    required
                                />
                            </div>

                            {/* Drag & Drop images */}
                            <div
                                ref={dropRef}
                                onDrop={handleImageDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-accent cursor-pointer transition"
                            >
                                <p className="text-foreground/70">Glissez des images ici ou cliquez pour sélectionner</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />
                            </div>

                            {/* Erreur */}
                            {errorMsg && (
                                <p className="text-destructive text-center text-sm">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-footer text-white p-3 rounded-lg shadow hover:bg-footer/90 transition mt-4"
                            >
                                {loading && (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                )}
                                {loading ? "Enregistrement..." : "Enregistrer"}
                            </button>
                        </div>

                        {/* Colonne droite : Preview images */}
                        <div className="md:w-1/2 grid grid-cols-2 gap-2 pt-4 overflow-y-auto max-h-[70vh]">
                            {images.length > 0 ? (
                                images.map((img, index) => {
                                    const isSupported = img.name.toLowerCase().endsWith(".jpg")

                                    return (
                                        <div key={index} className="relative">
                                            {isSupported ? (
                                                <>
                                                    <img
                                                        src={URL.createObjectURL(img)}
                                                        className="rounded-xl border shadow-sm w-full h-32 object-cover"
                                                    />

                                                    {uploadProgress[img.name] !== undefined && (
                                                        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                                                            <div
                                                                className="bg-footer-600 h-2 rounded-full transition-all"
                                                                style={{ width: `${uploadProgress[img.name]}%` }}
                                                            />
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={() =>
                                                            setImages(images.filter((_, i) => i !== index))
                                                        }
                                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-center rounded-xl border shadow-sm w-full h-32 p-2 text-center">
                                                    <p className="text-xs text-foreground/60">
                                                        Format non supporté : <br /> {img.name}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center rounded-xl border shadow-sm w-full h-32">
                                    <p className="text-sm text-foreground/60">Aucune image ajoutée</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
