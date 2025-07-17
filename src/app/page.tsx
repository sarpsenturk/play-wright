import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Code, Play, ExternalLink, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <FlaskConical className="size-12 text-primary" />
          <h1 className="text-4xl font-bold">PR Test</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Modern web uygulamaları için kapsamlı test otomasyonu. Playwright ile güvenilir, hızlı ve bakımı kolay testler yazın.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="size-5 text-primary" />
              <CardTitle>Playwright Codegen</CardTitle>
            </div>
            <CardDescription>
              Test kodlarınızı otomatik oluşturun. Tarayıcıdaki etkileşimlerinizi kaydedin ve anında çalışan test kodları elde edin.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-primary" />
              <CardTitle>GitHub Actions Entegrasyonu</CardTitle>
            </div>
            <CardDescription>
              CI/CD pipeline'ınıza sorunsuz entegrasyon. Her proje için belirli aralıklarla cron zamanlama ile otomatik test çalıştırma.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <CardTitle>Otomatik Raporlama</CardTitle>
            </div>
            <CardDescription>
              Test sonuçlarınızı otomatik olarak raporlayın ve mail ile ekibinize gönderin. Detaylı HTML raporları ve trace dosyaları.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Help Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playwright Help */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Play className="size-5 text-primary" />
              <CardTitle>Playwright ile Başlayın</CardTitle>
            </div>
            <CardDescription>
              Modern web uygulamaları için güçlü test otomasyonu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Temel Kavramlar</h4>
                <p className="text-sm text-muted-foreground">
                  Playwright, Chrome, Firefox ve Safari'de çalışan hızlı, güvenilir end-to-end testler yazmanızı sağlar.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Test Yazımı</h4>
                <p className="text-sm text-muted-foreground">
                  Basit API'lar ile sayfa navigasyonu, etkileşimler ve assertion'lar kolayca yazabilirsiniz.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Paralel Testler</h4>
                <p className="text-sm text-muted-foreground">
                  Testlerinizi paralel olarak çalıştırarak test sürenizi önemli ölçüde azaltın.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Dokümantasyon
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://playwright.dev/docs/writing-tests" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Test Yazımı
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Codegen Help */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="size-5 text-primary" />
              <CardTitle>Playwright Codegen</CardTitle>
            </div>
            <CardDescription>
              Test kodlarını otomatik olarak oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Otomatik Kod Üretimi</h4>
                <p className="text-sm text-muted-foreground">
                  Tarayıcıdaki etkileşimlerinizi kaydedin ve Playwright otomatik olarak test kodları oluştursun.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Hızlı Başlangıç</h4>
                <p className="text-sm text-muted-foreground">
                  Manuel test adımlarınızı tekrarlayın, codegen sizin için uygun test kodları yazsın.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Selector İyileştirme</h4>
                <p className="text-sm text-muted-foreground">
                  Codegen, en güvenilir ve bakımı kolay selector'ları otomatik olarak seçer.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <code className="text-sm font-mono">
                npx playwright codegen example.com
              </code>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://playwright.dev/docs/codegen" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Codegen Kılavuzu
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://playwright.dev/docs/codegen-intro" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Başlangıç
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Başlangıç</CardTitle>
          <CardDescription>
            İlk projenizi oluşturun ve testlerinizi yazmaya başlayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="bg-primary/10 rounded-full size-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-medium">Proje Oluştur</h4>
              <p className="text-sm text-muted-foreground">
                Yeni bir test projesi oluşturun ve ayarlarını yapılandırın.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-primary/10 rounded-full size-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-medium">Test Yaz</h4>
              <p className="text-sm text-muted-foreground">
                Codegen kullanarak veya manuel olarak test senaryolarınızı yazın.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-primary/10 rounded-full size-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-medium">Çalıştır</h4>
              <p className="text-sm text-muted-foreground">
                Testlerinizi çalıştırın ve sonuçları analiz edin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}