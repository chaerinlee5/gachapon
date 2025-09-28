import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

export default function AddToCollection({ isOpen, onClose }) {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [brand, setBrand] = useState("");
  const [series, setSeries] = useState("");
  const [figure, setFigure] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("id, name, brand, series, image_key");

      if (error) {
        console.error("Error fetching items:", error.message);
      } else {
        setItems(data || []);
      }
    };

    fetchItems();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user logged in");
      return;
    }
    if (!figure) {
      console.error("No figure selected");
      return;
    }

    const payload = {
      owner_id: user.id,
      item_id: Number(figure),   // convert string -> int
      for_trade: false           // add this if table requires it
    };

    console.log("Inserting:", payload);

    const { data, error } = await supabase
      .from("user_items")        // 👈 use the right table
      .insert([payload]);

    if (error) {
      console.error("Error inserting:", error.message);
    } else {
      console.log("Added to collection:", data);
      onClose();
    }
  };
 

  // Extract unique brands
  const brands = [...new Set(items.map((i) => i.brand))];

  // Extract unique series filtered by brand
  const seriesOptions = [
    ...new Set(items.filter((i) => i.brand === brand).map((i) => i.series)),
  ];

  // Extract figures filtered by brand + series
  const figureOptions = items.filter(
    (i) => i.brand === brand && i.series === series
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
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
              onChange={(e) => {
                setBrand(e.target.value);
                setSeries("");
                setFigure("");
              }}
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="">select brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Series dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">series</label>
            <select
              value={series}
              onChange={(e) => {
                setSeries(e.target.value);
                setFigure("");
              }}
              className="w-full px-3 py-2 border rounded bg-gray-100"
              disabled={!brand}
            >
              <option value="">select series</option>
              {seriesOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Figure dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">figure</label>
            <select
              value={figure}
              onChange={(e) => setFigure(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100"
              disabled={!series}
            >
              <option value="">select figure</option>
              {figureOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
