# Favicon 生成说明

由于无法直接生成.ico文件,请按以下步骤生成favicon:

## 方法1: 使用在线工具(推荐)

1. 访问 https://realfavicongenerator.org/
2. 上传 `logo.svg` 文件
3. 选择生成格式: ICO (16x16, 32x32, 48x48)
4. 下载生成的 `favicon.ico`
5. 将文件放置在此目录

## 方法2: 使用ImageMagick命令行

```bash
# 安装ImageMagick
brew install imagemagick  # macOS
# 或
sudo apt-get install imagemagick  # Linux

# 生成favicon
convert -background none logo.svg -define icon:auto-resize=16,32,48 favicon.ico
```

## 方法3: 使用Node.js脚本

```bash
npm install -g svg-to-ico
svg-to-ico logo.svg favicon.ico
```

## Apple Touch Icon

同样需要生成以下尺寸的PNG文件:
- apple-touch-icon.png (180x180)
- pwa-192x192.png (192x192)
- pwa-512x512.png (512x512)

可以使用 https://appicon.co/ 在线生成。
