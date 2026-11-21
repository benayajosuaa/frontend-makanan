import NavigationBar from "@/components/navbar"
import FirstHomePage from "@/components/home/home-1";
import ThirdHomePage from "@/components/home/home-3";
import FourHomePage from "@/components/home/home-4";
import FifthHomePage from "@/components/home/home-5";
import Footer from "@/components/footer";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import SecondHomePage from "@/components/home/home-2";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
  display: "swap",
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick",
  display: "swap",
});

export default function HomePage(){
    return (
        <div className={patrick.className}>
            <div className="bg-[#f9ead4]">
                <div className="z-20 fixed w-full">
                    <NavigationBar/>
                </div>

                {/* Imgae */}
                <div>
                    <img src="asset/rumahmakanan3.png" className="w-screen h-140 object-cover object-[center_10%]" alt="" />
                </div>

                {/* Paragraf */}
                <div className="p-20">
                    <p className="text-3xl text-[#714521]">
                        Pada 1950-an, “makanan” bermula dari dapur sebuah rumah di kawasan yang kini dikenal sebagai Jakarta Selatan. Setiap pagi, keluarga yang tinggal di rumah itu mulai menanak nasi, mengulek bumbu, dan menyiapkan lauk untuk makan siang. Menjelang tengah hari, pintu depan dibuka dan beberapa meja kayu digelar di teras. Dari situlah tetangga mulai mampir. Ada yang datang sepulang dari pasar, ada yang singgah di sela kerja, dan ada juga yang sekadar ingin tahu apa yang sedang dimasak.
                        
                        <br/><br/>

                        Menu waktu itu mengikuti apa yang tersedia di dapur. Kalau sayuran dari pasar sedang bagus, biasanya ada sayur asem dengan jagung, kacang panjang, dan melinjo. Kalau ada ikan segar, ikan itu dimasak dengan bumbu kuning dan disajikan bersama nasi hangat. Ayam ungkep jadi salah satu lauk yang paling sering ditanyakan. Beberapa pelanggan bahkan sudah berpesan sejak pagi supaya lauknya disisakan satu bungkus untuk orang rumah.

                        <br/><br/>

                        Lama-lama, teras itu jadi tempat orang saling kenal. Kalau semua meja penuh, pelanggan biasa bergeser sedikit untuk memberi tempat kepada orang yang baru datang. Ada yang makan cepat karena harus kembali bekerja, ada pula yang masih duduk sambil menghabiskan teh tawar meski piringnya sudah kosong. Saat anak-anak mulai ikut membantu di dapur, mereka belajar menakar bumbu, mengenali kapan kuah perlu diangkat, dan mengingat siapa pelanggan yang selalu minta sambalnya dipisah.

                        <br/><br/>

                        Ketika generasi berikutnya mulai mengurus rumah makan, mereka membawa lebih banyak masakan Nusantara ke meja. Di samping sayur asem yang sudah lama jadi menu harian, mulai ada soto Betawi berkuah gurih, rawon dengan kluwek, dan ayam woku dengan daun kemangi. Setiap hidangan menuntut cara masak yang berbeda. Rawon perlu waktu agar kuahnya matang dan dagingnya empuk, sementara kemangi untuk woku masuk mendekati akhir supaya wanginya masih terasa saat hidangan sampai di meja.

                        <br/><br/>

                        Kebiasaan orang makan juga ikut berubah. Dulu, orang biasanya mampir untuk makan siang atau membawa pulang satu bungkus lauk. Sekarang ada yang memesan dari ponsel sebelum jam istirahat, memilih beberapa lauk untuk makan bersama di kantor, atau menyiapkan pesanan buat acara keluarga. Kami menyesuaikan pilihan porsi dan cara mengemasnya. Kuah dan sambal bisa dipisah, dan lauk untuk makan ramai-ramai bisa dipesan dalam porsi berbagi supaya tinggal ditata begitu sampai di rumah.

                        <br/><br/>

                        Kalau kamu datang pertama kali dan bingung mau pilih apa, tanya saja, “Hari ini ada masakan apa?” Kami bisa kasih tahu lauk yang baru diangkat, sambal yang paling cocok, atau porsi yang cukup untuk satu meja. Dan kalau sudah selesai makan tapi masih kepikiran ayam ungkepnya, boleh bungkus satu lagi untuk orang rumah. Dari teras kecil di tahun 1950-an sampai hari ini, masih banyak yang pulang dengan cara itu.
                    </p>
                </div>


                {/* Footer */}
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}