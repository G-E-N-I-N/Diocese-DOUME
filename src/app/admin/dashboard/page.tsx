"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Edit2, Trash2, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";


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
    const [showForm, setShowForm] = useState(false);
    const [showDialog, setShowDialog] = useState<any>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const dropRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // News
    useEffect(() => {
        async function getNews() {
            const { data: newsData } = await supabase.from('news').select();
            if (newsData && newsData.length > 0) {
                setNews(newsData);
            }
        }
        getNews();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const handleSubmit = () => {
        console.log({ title, description, images });
    };

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
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Edit", item.id);
                                    }}
                                    className="p-1 rounded-full bg-transparent hover:bg-footer transition"
                                >
                                    <Edit2 className="w-5 h-5 text-primary" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Delete", item.id);
                                    }}
                                    className="p-1 rounded-full bg-transparent hover:bg-footer transition"
                                >
                                    <Trash2 className="w-5 h-5 text-destructive" />
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
                            <p className="text-foreground/80 whitespace-pre-line text-justify">{showDialog.description}</p>
                        </div>

                    </div>
                </div>
            )}


            {/* Formulaire d'ajout */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-footer text-white p-3 rounded-lg shadow hover:bg-footer/90 transition mt-4"
                            >
                                Enregistrer
                            </button>
                        </div>

                        {/* Colonne droite : Preview images */}
                        <div className="md:w-1/2 grid grid-cols-2 gap-2 pt-4 overflow-y-auto max-h-[70vh]">
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            className="rounded-xl border shadow-sm w-full h-32 object-cover"
                                        />
                                        <button
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                                            className="absolute top-2 right-2 bg-black/50 hover:text-destructive text-white p-1 rounded-full"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))
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
