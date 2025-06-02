import { useState } from 'react';

export default function WeatherForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState(
    initialData || { city: '', startDate: '', endDate: '' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ city: '', startDate: '', endDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input
        type="text"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        placeholder="City"
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        {initialData ? 'Update Weather' : 'Get Weather'}
      </button>
    </form>
  );
}