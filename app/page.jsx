"use client";
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      setError(null);
      try {
        // Perform search request
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.category) {
          // Redirect to category page
          router.push(`/categories/${encodeURIComponent(data.category)}`);
        } else if (data.places && data.places.length > 0) {
          // Redirect to the first place found
          router.push(`/places/${data.places[0].id}`);
        } else {
          setError('ไม่พบผลลัพธ์สำหรับคำค้นหาของคุณ');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
        setError('เกิดข้อผิดพลาดในการค้นหา');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main>
      <>
        <Head>
          <title>หน้าแรก | ค้นหาที่เที่ยวน่าสนใจ</title>
          <meta name="keywords" content="แนะนำที่เที่ยว, สถานที่, ร้านอาหาร, คาเฟ่, ที่พัก"/>
        </Head>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#7AA2E3] p-3">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            โมโม๊ะเด้อ!!! บุรีรัมย์
          </h1>
          <Image src="/images/bg.png" width={300} height={300} alt="logo" className="mb-4"/>
          <p className="text-lg text-gray-700 text-center mb-8">
            ยินดีต้อนรับสู่เว็บไซต์แนะนำที่ท่องเที่ยว
          </p>
          
          <div className="w-full max-w-lg">
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <input
                type="text"
                placeholder="ค้นหาสถานที่แหล่งท่องเที่ยว ร้านอาหาร คาเฟ่ ที่พัก"
                className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
              </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </>
    </main>
  );
}
