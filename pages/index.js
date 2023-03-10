import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allphotos }) {
  const [photo, setPhoto] = useState("");
  const singlePhoto = allphotos.map((photo) => photo.largeImageURL);

  const handleClick = () => {
    const random = Math.floor(Math.random() * 20 + 1);
    setPhoto(singlePhoto[random]);
  };

  return (
    <>
      <Head>
        <title>Photom App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
          <div className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-900 via-amber-100 to-orange-900 p-8 rounded-lg ">
            <div className="text-center mt-4">
              <button
                class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md hover:scale-105 transition transform duration-200 ease-out active:shadow-lg shadow-sm"
                onClick={handleClick}
              >
                <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span class="relative text-white"> Fetch Another Photo</span>
                </span>
              </button>
              {/* <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                onClick={handleClick}
              >
                Fetch Another Photo
              </button> */}
            </div>
          </div>
          {photo ? (
            <div className="relative h-2/3 w-2/3 mx-auto mt-12">
              <Image
                className="rounded-xl shadow-2xl"
                src={photo}
                fill
                objectFit="cover"
                alt="pixabay"
              />
            </div>
          ) : (
            <div className="relative h-2/3 w-2/3 mx-auto mt-12">
              <Image
                className="rounded-xl shadow-2xl"
                src="https://cdn.pixabay.com/photo/2023/01/09/16/46/goat-7707878_1280.jpg"
                fill
                objectFit="cover"
                alt="pixabay"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://pixabay.com/api/?key=32921114-8ff93b49854b9d71b2e624486&q=girl&image_type=photo?per_page=200"
  );
  const data = await res.json();
  const allphotos = data.hits;

  return {
    props: {
      allphotos,
    },
  };
};
