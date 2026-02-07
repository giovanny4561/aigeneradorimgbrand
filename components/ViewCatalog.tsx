import React, { useState } from 'react';
import { Icon } from './Icon';
import { Product } from '../types';

interface Props {
  onNext: () => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velocity Runner',
    description: 'Zapatillas de alto rendimiento para maratón, con tecnología de espuma reactiva y malla transpirable.',
    price: 129.99,
    sku: 'VR-2024-RED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-ryZp431z9WR_VZA9hrbnnRnnXq_p9W8sTVX0TyJUAMz5nP2A0PexY6e4UzIWmOKsdtlha9wyZu8rMhs9vcWTbh1TnS5Im9Vtf3WpezEV2Uhsbb_n7zCMslmuXzPerK-eTAtZLzKGIJEbWzhQkwiBogK9byVmCX0DUK8W3zmVLQAM63vDmcbPkDqjBnTdB2J0x_B7GRNC6pdqJX5zmD0jwuLFxvpgJQLYZagVhfNSc8gz7ywdzDN8JOHe62eiPPTwkDvxaT_lD7oF',
    imageNoBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-ryZp431z9WR_VZA9hrbnnRnnXq_p9W8sTVX0TyJUAMz5nP2A0PexY6e4UzIWmOKsdtlha9wyZu8rMhs9vcWTbh1TnS5Im9Vtf3WpezEV2Uhsbb_n7zCMslmuXzPerK-eTAtZLzKGIJEbWzhQkwiBogK9byVmCX0DUK8W3zmVLQAM63vDmcbPkDqjBnTdB2J0x_B7GRNC6pdqJX5zmD0jwuLFxvpgJQLYZagVhfNSc8gz7ywdzDN8JOHe62eiPPTwkDvxaT_lD7oF',
    visualReferences: ['https://via.placeholder.com/150'],
    status: 'Ready',
    tags: ['Calzado', 'Verano']
  },
  {
    id: '2',
    name: 'Eco Succulent',
    description: 'Mini suculenta artificial en maceta de cerámica reciclada, perfecta para escritorios modernos.',
    price: 24.50,
    sku: 'PLT-MINI-04',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmCKoLQiK9Ul0CR_MmU-x56Pd5BV44YUGKpib2zP1I0bqvnQtR29sbQ0jBnLyDu1HKRae6FsMajNEvzrLbSPTGxBow43IqMdcdt0yCW1t4Sv-imHRb809DZQQfQxwFnrP7Cjq7mF9h2K76eWsVNDQih0xK2QijbuyZU-wEIBnKDNOUJnUl-04kR3qkXg8HWc5pv1R1vDXTWSofPyLgWQt41YBFJ_HgUT8eoYisOiW2Z11KD4uGvf-NppGaCLFfcf1kQvVDHDzZZmil',
    imageNoBg: '',
    visualReferences: [],
    status: 'Processing',
    tags: ['Decoración']
  },
  {
    id: '3',
    name: 'Sonic Bass Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería.',
    price: 199.00,
    sku: 'AUD-HEAD-99',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIvVSYCmBDjmyJOVpwSqPvi4BFTdlHvd_BGk5cJhmuGHnTRN6nToTdiq55NBb1ofj8KBBXYTZNvyN3COxwITDd8_bJ4bJlA44EL3HVUqgXEirYcHWnoauQy5YmXBbULu-oC8QqdqUU70HUNCa5vTgeDBNe7kZTuBF5THvg6kM2u3O4rJm9zoG2jURNYNmJ497p3M7VZ7X7oVgD0S1GOisEBbz0JzGT-BywBFgU4k3L98wDMzgewRVqbMf8v0WLd28phPljR5ctlRzM',
    imageNoBg: '',
    visualReferences: [],
    status: 'Ready',
    tags: ['Electrónica', 'Audio']
  }
];

export const ViewCatalog: React.FC<Props> = ({ onNext }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
      name: '', description: '', price: 0, sku: '', image: '', imageNoBg: '', tags: [], visualReferences: []
  });

  const handleOpenModal = (product?: Product) => {
      if (product) {
          setEditingId(product.id);
          setFormData(product);
      } else {
          setEditingId(null);
          setFormData({ name: '', description: '', price: 0, sku: '', image: '', imageNoBg: '', tags: [], status: 'Processing', visualReferences: [] });
      }
      setIsModalOpen(true);
  };

  const handleSave = () => {
      if (editingId) {
          setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
      } else {
          const newProduct: Product = {
              ...formData as Product,
              id: Date.now().toString(),
              status: 'Ready',
              tags: formData.tags || [],
              visualReferences: formData.visualReferences || []
          };
          setProducts(prev => [newProduct, ...prev]);
      }
      setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
      if(confirm('¿Estás seguro de eliminar este producto?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
      }
  };

  const handleAddReference = () => {
      // Mock adding a reference image
      const newRef = 'https://via.placeholder.com/150';
      setFormData(prev => ({ ...prev, visualReferences: [...(prev.visualReferences || []), newRef] }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2 text-sm">
            <span className="text-text-muted">Activos de Marca</span>
            <Icon name="chevron_right" className="text-[16px] text-slate-400" />
            <span className="text-text-main font-medium">Inventario del Catálogo</span>
        </div>
        <div className="flex items-center gap-4">
             <button onClick={onNext} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-hover transition-all">
                <span>Finalizar Configuración</span>
                <Icon name="arrow_forward" />
            </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-8">
            
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <h1 className="text-3xl font-bold text-text-main tracking-tight">Inventario de Productos</h1>
                    <p className="text-text-muted">Gestiona los activos de tu inventario. Asegúrate de añadir una imagen sin fondo para mejorar la generación de IA.</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                
                {/* Add New Card */}
                <div onClick={() => handleOpenModal()} className="group relative flex min-h-[360px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center hover:border-primary hover:bg-slate-50 transition-all duration-300">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon name="add" className="text-4xl text-slate-400 group-hover:text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-main">Añadir Producto</h3>
                        <p className="mt-1 text-sm text-text-muted">Manual o Importar</p>
                    </div>
                </div>

                {/* Product Cards */}
                {products.map((product) => (
                    <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="relative aspect-square w-full overflow-hidden p-6 flex items-center justify-center border-b border-slate-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDBoMTB2MTBIMTBWMHkwIDEwaDEwdjEwSDBWMHoiIGZpbGw9IiNmOGZhZmMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]">
                            <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
                            
                            <div className="absolute top-3 right-3">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur-md ${
                                    product.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                    product.status === 'Processing' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                                    'bg-red-50 text-red-700 ring-red-600/10'
                                }`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <button onClick={(e) => { e.stopPropagation(); handleOpenModal(product); }} className="p-2 bg-white rounded-full text-slate-700 hover:text-primary transition-colors">
                                    <Icon name="edit" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }} className="p-2 bg-white rounded-full text-slate-700 hover:text-red-500 transition-colors">
                                    <Icon name="delete" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-base font-semibold text-text-main line-clamp-1">{product.name}</h3>
                                </div>
                                <p className="text-sm font-bold text-text-main mb-1">${product.price.toFixed(2)}</p>
                                <p className="text-xs font-mono text-text-muted mb-2">SKU: {product.sku}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-text-main">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-text-main"><Icon name="close" /></button>
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="space-y-1">
                                <span className="text-xs font-bold text-text-muted uppercase">Nombre</span>
                                <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nombre del producto" />
                            </label>
                            <label className="space-y-1">
                                <span className="text-xs font-bold text-text-muted uppercase">SKU</span>
                                <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary transition-colors" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} placeholder="SKU-123" />
                            </label>
                        </div>
                        <label className="space-y-1 block">
                            <span className="text-xs font-bold text-text-muted uppercase">Descripción</span>
                            <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary transition-colors resize-none h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe el producto detalladamente..." />
                        </label>
                         <label className="space-y-1 block">
                            <span className="text-xs font-bold text-text-muted uppercase">Precio</span>
                            <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary transition-colors" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
                        </label>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs font-bold text-text-muted uppercase block mb-2">Imagen Principal</span>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors h-32 relative overflow-hidden group">
                                     {formData.image ? (
                                        <>
                                            <img src={formData.image} className="h-full w-full object-contain" />
                                            <button onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="close" className="text-sm" /></button>
                                        </>
                                     ) : (
                                         <>
                                            <Icon name="image" className="text-slate-400 mb-1" />
                                            <span className="text-xs text-slate-500">Subir URL o Archivo</span>
                                            <input type="text" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => setFormData({...formData, image: 'https://via.placeholder.com/300'})} />
                                         </>
                                     )}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-text-muted uppercase block mb-2">Imagen Sin Fondo (PNG)</span>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDBoMTB2MTBIMTBWMHkwIDEwaDEwdjEwSDBWMHoiIGZpbGw9IiNmOGZhZmMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] relative overflow-hidden group">
                                    {formData.imageNoBg ? (
                                        <>
                                            <img src={formData.imageNoBg} className="h-full w-full object-contain" />
                                            <button onClick={() => setFormData({...formData, imageNoBg: ''})} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="close" className="text-sm" /></button>
                                        </>
                                     ) : (
                                         <>
                                            <Icon name="layers" className="text-slate-400 mb-1" />
                                            <span className="text-xs text-slate-500">Subir PNG Transparente</span>
                                            <input type="text" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => setFormData({...formData, imageNoBg: 'https://via.placeholder.com/300'})} />
                                         </>
                                     )}
                                </div>
                            </div>
                        </div>

                        {/* Visual References Section */}
                        <div>
                            <span className="text-xs font-bold text-text-muted uppercase block mb-2">Referencias Visuales (Ejemplos Exitosos)</span>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {(formData.visualReferences || []).map((ref, i) => (
                                    <div key={i} className="size-24 shrink-0 rounded-lg border border-slate-200 overflow-hidden relative group">
                                        <img src={ref} className="h-full w-full object-cover" />
                                        <button onClick={() => setFormData(prev => ({...prev, visualReferences: prev.visualReferences?.filter((_, idx) => idx !== i)}))} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"><Icon name="close" className="text-xs" /></button>
                                    </div>
                                ))}
                                <button onClick={handleAddReference} className="size-24 shrink-0 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-slate-50 transition-all">
                                    <Icon name="add_photo_alternate" />
                                    <span className="text-[10px] mt-1">Añadir</span>
                                </button>
                            </div>
                            <p className="text-xs text-text-muted mt-2">Sube ejemplos de contenido exitoso para guiar al modelo de IA.</p>
                        </div>

                    </div>
                    <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">Cancelar</button>
                        <button onClick={handleSave} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 transition-colors">Guardar Producto</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};