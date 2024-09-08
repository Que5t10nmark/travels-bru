"use client"; // เพิ่มบรรทัดนี้

import { useRouter } from 'next/navigation'; // เปลี่ยนการนำเข้า
import { useEffect, useState } from 'react';

export default function PlacePage() {
  const router = useRouter();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`/api/places/${id}`);
        const data = await res.json();
        setPlace(data.place);
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    fetchPlace();
  }, [id]);

  if (!place) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
      <div className="relative w-full h-64 mb-4">
        <img
          src={place.image}
          alt={place.name}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <p className="text-lg mb-4">{place.description}</p>
      <div>
        <h2 className="text-2xl font-bold">Comments</h2>
        {place.comments.map(comment => (
          <div key={comment.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <p><strong>{comment.user.name}</strong> ({comment.rating} stars)</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
