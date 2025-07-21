# PR Test

Otomatik testleri/görevleri yönetmek ve çalıştırmak için bir Next.js uygulaması.

## Başlangıç

Önce ortam dosyasını ayarlayın (.env.example dosyasını .env olarak yeniden adlandırın):

```bash
cp .env.example .env
```

Ardından, projeyi derleyin:

```bash
./scripts/build.sh
```

Son olarak, geliştirme sunucusunu çalıştırın:

```bash
./scripts/run.sh
```

Sonucu görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Geliştiriciler İçin

Alternatif olarak, doğrudan pnpm komutlarını kullanabilirsiniz:

Bağımlılıkları yükleyin:

```bash
pnpm install
```

Prisma istemcisini oluşturun:

```bash
pnpm exec prisma generate
```

Geliştirme sunucusunu çalıştırın:

```bash
pnpm dev
```