import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Cookie, Settings, Shield, BarChart3, Target } from 'lucide-react';

export default function CookiePolicy() {
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
                Kebijakan Cookie
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Informasi tentang penggunaan cookies dan teknologi pelacakan
                serupa di website Sumpang Bita Tourism.
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
                    <Cookie className="w-5 h-5 text-orange-600" />
                    <span>Apa itu Cookie?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Cookies adalah file teks kecil yang disimpan di perangkat
                    Anda (komputer, tablet, atau smartphone) saat Anda
                    mengunjungi website. Cookies membantu website untuk
                    mengingat informasi tentang kunjungan Anda, seperti
                    preferensi bahasa dan pengaturan lainnya.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-blue-800 text-sm">
                      <strong>Catatan:</strong> Cookies tidak mengandung virus
                      atau malware dan tidak dapat mengakses informasi pribadi
                      di perangkat Anda selain data yang secara eksplisit Anda
                      berikan kepada website.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span>Jenis Cookie yang Kami Gunakan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-600" />
                      1. Cookies Esensial
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Cookies yang diperlukan agar website dapat berfungsi
                      dengan baik. Tanpa cookies ini, beberapa fitur website
                      tidak akan bekerja.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-6">
                      <li>Session cookies untuk menjaga sesi browsing Anda</li>
                      <li>Security cookies untuk keamanan website</li>
                      <li>Load balancing cookies untuk distribusi traffic</li>
                    </ul>
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Durasi:</strong> Session (dihapus saat browser
                      ditutup) atau hingga 24 jam
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                      2. Cookies Analitik
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Membantu kami memahami cara pengunjung berinteraksi dengan
                      website untuk meningkatkan pengalaman pengguna.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-6">
                      <li>Google Analytics untuk statistik pengunjung</li>
                      <li>Heatmap tools untuk analisis perilaku pengguna</li>
                      <li>Performance monitoring untuk kecepatan website</li>
                    </ul>
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Durasi:</strong> Hingga 2 tahun
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-600" />
                      3. Cookies Fungsional
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Mengingat pilihan Anda untuk memberikan pengalaman yang
                      lebih personal dan relevan.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-6">
                      <li>Preferensi bahasa dan wilayah</li>
                      <li>Pengaturan tampilan website</li>
                      <li>Informasi login (jika ada akun)</li>
                      <li>Items di wishlist atau keranjang booking</li>
                    </ul>
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Durasi:</strong> Hingga 1 tahun
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Beberapa cookies di website kami ditempatkan oleh layanan
                    pihak ketiga yang kami gunakan untuk meningkatkan
                    fungsionalitas website:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Google Analytics
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Untuk menganalisis traffic website dan perilaku
                        pengunjung
                      </p>
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Kebijakan Privasi Google
                      </a>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Google Maps
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Untuk menampilkan peta lokasi dan navigasi
                      </p>
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Kebijakan Privasi Google
                      </a>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Social Media
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Widget media sosial (Facebook, Instagram, dll.)
                      </p>
                      <p className="text-xs text-gray-500">
                        Lihat kebijakan masing-masing platform
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        WhatsApp
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Widget chat untuk komunikasi langsung
                      </p>
                      <a
                        href="https://www.whatsapp.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Kebijakan Privasi WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    <span>Cara Mengelola Cookies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Anda memiliki kontrol penuh atas cookies dan dapat
                    mengelolanya melalui pengaturan browser Anda:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">Pengaturan Browser</h5>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="border rounded p-3">
                          <strong className="text-sm">Google Chrome</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Settings → Privacy and Security → Cookies and other
                            site data
                          </p>
                        </div>
                        <div className="border rounded p-3">
                          <strong className="text-sm">Mozilla Firefox</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Options → Privacy & Security → Cookies and Site Data
                          </p>
                        </div>
                        <div className="border rounded p-3">
                          <strong className="text-sm">Safari</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Preferences → Privacy → Manage Website Data
                          </p>
                        </div>
                        <div className="border rounded p-3">
                          <strong className="text-sm">Microsoft Edge</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Settings → Cookies and site permissions
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">
                        Pilihan Pengelolaan
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li>
                          <strong>Terima semua cookies:</strong> Website
                          berfungsi optimal
                        </li>
                        <li>
                          <strong>Tolak cookies non-esensial:</strong> Fungsi
                          dasar tetap bekerja
                        </li>
                        <li>
                          <strong>Hapus cookies:</strong> Reset semua preferensi
                          dan data
                        </li>
                        <li>
                          <strong>Blokir third-party cookies:</strong> Batasi
                          pelacakan eksternal
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-yellow-800 text-sm">
                        <strong>Perhatian:</strong> Menonaktifkan cookies
                        tertentu dapat mempengaruhi fungsionalitas website,
                        seperti form booking, preferensi bahasa, dan fitur
                        personalisasi lainnya.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Perubahan Kebijakan Cookie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Kami dapat memperbarui kebijakan cookie ini sewaktu-waktu
                    untuk mencerminkan perubahan dalam praktik atau peraturan
                    yang berlaku. Perubahan akan diumumkan di halaman ini dengan
                    tanggal revisi terbaru.
                  </p>
                  <p className="text-sm text-gray-600">
                    Kami menyarankan Anda untuk meninjau kebijakan ini secara
                    berkala untuk tetap mendapat informasi tentang penggunaan
                    cookies kami.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-900">
                    Hubungi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-800 mb-4">
                    Jika Anda memiliki pertanyaan tentang kebijakan cookie ini
                    atau penggunaan cookies di website kami:
                  </p>
                  <div className="space-y-2 text-orange-700">
                    <p>
                      <strong>Email:</strong> privacy@sumpangbita.com
                    </p>
                    <p>
                      <strong>WhatsApp:</strong> +62 811-4567-890
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
                  Dengan melanjutkan penggunaan website ini, Anda menyetujui
                  penggunaan cookies sesuai dengan kebijakan yang dijelaskan di
                  atas.
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
