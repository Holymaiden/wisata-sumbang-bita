import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Legal Information
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Syarat & Ketentuan
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Syarat dan ketentuan penggunaan website dan layanan wisata
                Sumpang Bita Tourism.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Terakhir diperbarui:{' '}
                {new Date().toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Penerimaan Syarat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Dengan mengakses dan menggunakan website ini serta layanan
                    wisata Sumpang Bita, Anda menyetujui untuk terikat oleh
                    syarat dan ketentuan berikut. Jika Anda tidak setuju dengan
                    syarat ini, mohon untuk tidak menggunakan layanan kami.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span>Layanan Wisata</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Pemesanan dan Reservasi</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Semua pemesanan harus dilakukan minimal 24 jam sebelum
                      kunjungan
                    </li>
                    <li>
                      Konfirmasi booking akan dikirim melalui WhatsApp atau
                      email yang terdaftar
                    </li>
                    <li>
                      Pembayaran dapat dilakukan secara cash di lokasi atau
                      transfer bank
                    </li>
                    <li>
                      Bukti pembayaran atau booking harus dibawa saat kunjungan
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-6">Harga Tiket</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Harga tiket dapat berubah sewaktu-waktu tanpa
                      pemberitahuan sebelumnya
                    </li>
                    <li>
                      Harga khusus berlaku untuk anak-anak di bawah 12 tahun
                    </li>
                    <li>
                      Tarif grup tersedia untuk kunjungan 20 orang atau lebih
                    </li>
                    <li>Pembayaran dalam mata uang Rupiah Indonesia</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Kebijakan Pembatalan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      <strong>Pembatalan 24+ jam sebelumnya:</strong> Refund
                      penuh atau reschedule gratis
                    </li>
                    <li>
                      <strong>Pembatalan 12-24 jam:</strong> Biaya administrasi
                      25% dari total booking
                    </li>
                    <li>
                      <strong>Pembatalan kurang dari 12 jam:</strong> Biaya
                      administrasi 50%
                    </li>
                    <li>
                      <strong>No-show tanpa pemberitahuan:</strong> Tidak ada
                      refund
                    </li>
                    <li>
                      <strong>Pembatalan karena cuaca buruk:</strong> Reschedule
                      gratis atau refund penuh
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Aturan dan Keselamatan Kunjungan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Aturan Umum</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Jam operasional: 08:00 - 17:00 WITA setiap hari</li>
                    <li>Dilarang membawa alkohol dan narkoba ke area wisata</li>
                    <li>Dilarang merusak flora, fauna, dan formasi batuan</li>
                    <li>Sampah harus dibuang pada tempatnya</li>
                    <li>Dilarang membuat api unggun sembarangan</li>
                    <li>Ikuti instruksi pemandu wisata dan petugas keamanan</li>
                  </ul>

                  <h4 className="font-semibold mt-6">Keselamatan</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Gunakan sepatu dengan grip yang baik untuk trekking</li>
                    <li>
                      Anak-anak harus selalu dalam pengawasan orang dewasa
                    </li>
                    <li>Berenang dilakukan dengan resiko sendiri</li>
                    <li>Dilarang melompat dari tebing atau bebatuan tinggi</li>
                    <li>Patuhi rambu-rambu peringatan dan batas area</li>
                    <li>
                      Laporkan segera jika terjadi kecelakaan atau keadaan
                      darurat
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-6">
                    Perlengkapan yang Disarankan
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Sepatu trekking atau sandal anti-selip</li>
                    <li>Pakaian ganti dan handuk</li>
                    <li>Tabir surya dan topi</li>
                    <li>Air minum dan snack</li>
                    <li>Kamera tahan air (opsional)</li>
                    <li>Obat-obatan pribadi jika diperlukan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span>Tanggung Jawab dan Liability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Tanggung Jawab Pengunjung</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Bertanggung jawab atas keselamatan diri sendiri dan
                      keluarga
                    </li>
                    <li>Menjaga kebersihan dan kelestarian lingkungan</li>
                    <li>Mengganti rugi jika menyebabkan kerusakan fasilitas</li>
                    <li>
                      Memberikan informasi kesehatan yang akurat jika diperlukan
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-6">
                    Batasan Tanggung Jawab Kami
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Tidak bertanggung jawab atas kehilangan barang pribadi
                    </li>
                    <li>
                      Tidak bertanggung jawab atas cedera karena kelalaian
                      pengunjung
                    </li>
                    <li>
                      Tidak bertanggung jawab atas kondisi cuaca dan bencana
                      alam
                    </li>
                    <li>
                      Berhak menolak atau mengeluarkan pengunjung yang melanggar
                      aturan
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hak Kekayaan Intelektual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Semua konten website (teks, gambar, video) adalah milik
                      Sumpang Bita Tourism
                    </li>
                    <li>
                      Dilarang menggunakan konten untuk tujuan komersial tanpa
                      izin
                    </li>
                    <li>
                      Foto dan video pengunjung dapat digunakan untuk promosi
                      dengan persetujuan
                    </li>
                    <li>Nama &quot;Sumpang Bita&quot; adalah merek dagang terdaftar</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Perubahan Syarat dan Ketentuan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
                    Perubahan akan diumumkan di website dengan tanggal revisi
                    terbaru. Penggunaan layanan setelah perubahan dianggap
                    sebagai persetujuan atas syarat yang baru.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Hubungi Kami</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800 mb-4">
                    Jika Anda memiliki pertanyaan tentang syarat dan ketentuan
                    ini, silakan hubungi kami:
                  </p>
                  <div className="space-y-2 text-green-700">
                    <p>
                      <strong>Email:</strong> info@sumpangbita.com
                    </p>
                    <p>
                      <strong>WhatsApp:</strong> +62 811-4567-890
                    </p>
                    <p>
                      <strong>Alamat:</strong> Pangkajene, Sulawesi Selatan
                    </p>
                    <p>
                      <strong>Jam Operasional:</strong> 08:00 - 17:00 WITA
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="text-center text-sm text-gray-500">
                <p>
                  Dengan menggunakan layanan kami, Anda mengonfirmasi bahwa Anda
                  telah membaca, memahami, dan menyetujui syarat dan ketentuan
                  ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
