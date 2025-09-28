import React, { useState } from "react";

export default function AddToCollection({ isOpen, onClose }) {
  const [brand, setBrand] = useState("");
  const [collection, setCollection] = useState("");
  const [figure, setFigure] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected:", { brand, collection, figure });
    // TODO: Later connect this to Supabase insert
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-gray-600"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold">add to collection</h2>
          <button
            onClick={handleSubmit}
            className="text-xl font-bold text-black-600 hover:text-green-800"
          >
            ╋
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="">select brand</option>
              <option value="sonny-angel">Sonny Angel</option>
              <option value="smiski">Smiski</option>
              <option value="bearbrick">Bearbrick</option>
            </select>
          </div>

          {/* Collection dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">collection</label>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="">select collection</option>
              <option value="animal-series">Animal Series</option>
              <option value="fruit-series">Fruit Series</option>
              <option value="flower-series">Flower Series</option>
            </select>
          </div>

          {/* Figure dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">figure</label>
            <select
              value={figure}
              onChange={(e) => setFigure(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="">select figure</option>
              <option value="lion">Lion</option>
              <option value="apple-boy">Apple Boy</option>
              <option value="rose-girl">Rose Girl</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}