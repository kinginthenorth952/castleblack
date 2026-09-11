import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Trash2, 
  X, 
  Package, 
  Tag, 
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PackageCategoriesTab: React.FC = () => {
  const { packageCategories, adminAddCategory, adminDeleteCategory, plans } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    adminAddCategory({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: description || 'Specialized capital portfolio tier',
      status: 'active',
      displayOrder: packageCategories.length + 1,
      badge: badge || undefined,
    });

    setName('');
    setSlug('');
    setDescription('');
    setBadge('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Package Categories</h2>
            <p className="text-xs text-[#7F8792]">
              Organize investment plans into distinct investor risk and yield segments.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packageCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-[#11151A] border border-[#252B33] flex flex-col justify-between hover:border-[#353D4A] transition"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#171C22] border border-[#343B45] flex items-center justify-center text-[#D6B36A]">
                  <Tag className="w-4 h-4" />
                </div>
                {cat.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/30">
                    {cat.badge}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#F4F1EA] mb-1">{cat.name}</h3>
              <span className="text-[10px] text-[#636C78] font-mono block mb-2">/{cat.slug}</span>
              <p className="text-xs text-[#7F8792] leading-relaxed mb-4">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-[#212730] flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                <span>Active Tier</span>
              </span>

              <button
                onClick={() => adminDeleteCategory(cat.id)}
                className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400 transition"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Create New Category</h3>
            <p className="text-xs text-[#7F8792] mb-4">Set up a portfolio group for investment packages.</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Syndicate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Slug (URL Key)</label>
                <input
                  type="text"
                  placeholder="e.g. vip-syndicate"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. HIGH YIELD"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of this package classification..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
