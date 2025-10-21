import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Lock, Users, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
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
                Kebijakan Privasi
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kami menghargai privasi Anda dan berkomitmen untuk melindungi
                informasi pribadi yang Anda berikan kepada kami.
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
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span>Informasi yang Kami Kumpulkan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Kami dapat mengumpulkan informasi berikut dari Anda:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      <strong>Informasi Pribadi:</strong> Nama, alamat email,
                      nomor telepon yang Anda berikan saat melakukan booking
                      atau berlangganan newsletter
                    </li>
                    <li>
                      <strong>Informasi Kunjungan:</strong> Data tentang cara
                      Anda menggunakan website kami, termasuk halaman yang
                      dikunjungi dan waktu kunjungan
                    </li>
                    <li>
                      <strong>Informasi Perangkat:</strong> Jenis perangkat,
                      browser, alamat IP, dan informasi teknis lainnya
                    </li>
                    <li>
                      <strong>Cookies:</strong> Data yang disimpan di perangkat
                      Anda untuk meningkatkan pengalaman browsing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Cara Kami Menggunakan Informasi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Informasi yang kami kumpulkan digunakan untuk:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Memproses booking dan reservasi wisata</li>
                    <li>
                      Mengirimkan konfirmasi dan informasi terkait kunjungan
                      Anda
                    </li>
                    <li>Memberikan layanan pelanggan dan dukungan</li>
                    <li>
                      Mengirimkan newsletter dan update tentang Sumpang Bita
                      (dengan persetujuan Anda)
                    </li>
                    <li>
                      Menganalisis penggunaan website untuk perbaikan layanan
                    </li>
                    <li>Mematuhi kewajiban hukum yang berlaku</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span>Keamanan Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Kami menerapkan langkah-langkah keamanan yang sesuai untuk
                    melindungi informasi pribadi Anda:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Enkripsi data saat transmisi menggunakan protokol SSL/TLS
                    </li>
                    <li>Akses terbatas hanya untuk personel yang berwenang</li>
                    <li>Sistem monitoring keamanan 24/7</li>
                    <li>Backup data secara berkala</li>
                    <li>Update keamanan sistem secara rutin</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-red-600" />
                    <span>Pembagian Informasi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Kami tidak menjual, menyewakan, atau memberikan informasi
                    pribadi Anda kepada pihak ketiga, kecuali dalam situasi
                    berikut:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Dengan persetujuan eksplisit dari Anda</li>
                    <li>
                      Untuk memenuhi kewajiban hukum atau perintah pengadilan
                    </li>
                    <li>
                      Kepada penyedia layanan terpercaya yang membantu
                      operasional kami (dengan perjanjian kerahasiaan)
                    </li>
                    <li>
                      Dalam situasi darurat untuk melindungi keselamatan
                      pengunjung
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <span>Hak-Hak Anda</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Anda memiliki hak-hak berikut terkait informasi pribadi
                    Anda:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      <strong>Akses:</strong> Meminta salinan informasi pribadi
                      yang kami miliki tentang Anda
                    </li>
                    <li>
                      <strong>Perbaikan:</strong> Meminta koreksi informasi yang
                      tidak akurat atau tidak lengkap
                    </li>
                    <li>
                      <strong>Penghapusan:</strong> Meminta penghapusan
                      informasi pribadi dalam kondisi tertentu
                    </li>
                    <li>
                      <strong>Pembatasan:</strong> Meminta pembatasan pemrosesan
                      informasi Anda
                    </li>
                    <li>
                      <strong>Portabilitas:</strong> Meminta transfer informasi
                      Anda ke penyedia layanan lain
                    </li>
                    <li>
                      <strong>Keberatan:</strong> Menolak pemrosesan informasi
                      untuk tujuan tertentu
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cookies dan Teknologi Pelacakan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Website kami menggunakan cookies untuk:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Mengingat preferensi dan pengaturan Anda</li>
                    <li>Menganalisis traffic website</li>
                    <li>Memberikan konten yang relevan</li>
                    <li>Meningkatkan keamanan website</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Anda dapat mengatur preferensi cookies melalui pengaturan
                    browser Anda. Namun, menonaktifkan cookies tertentu mungkin
                    mempengaruhi fungsionalitas website.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Hubungi Kami</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 mb-4">
                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini
                    atau ingin menggunakan hak-hak Anda, silakan hubungi kami:
                  </p>
                  <div className="space-y-2 text-blue-700">
                    <p>
                      <strong>Email:</strong> privacy@sumpangbita.com
                    </p>
                    <p>
                      <strong>Telepon:</strong> +62 811-4567-890
                    </p>
                    <p>
                      <strong>Alamat:</strong> Pangkajene, Sulawesi Selatan
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="text-center text-sm text-gray-500">
                <p>
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu.
                  Perubahan akan diumumkan di halaman ini dengan tanggal revisi
                  terbaru.
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
