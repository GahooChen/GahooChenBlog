# 第24课：Python图形和多媒体处理

图形和多媒体处理是Python编程中的重要领域，它涉及图像、音频、视频等媒体的创建、修改和分析。Python提供了丰富的库和工具，使得图形和多媒体处理变得简单和高效。在本节课中，我们将学习Python中的图形和多媒体处理相关知识。

## 24.1 图形处理基础

图形处理是指对图像进行各种操作，如读取、显示、修改、保存等。Python中有许多用于图形处理的库，其中最常用的是PIL（Python Imaging Library）及其分支Pillow。

### 24.1.1 PIL/Pillow库

PIL（Python Imaging Library）是Python中最常用的图像处理库之一，但由于它不再积极维护，现在通常使用它的分支Pillow，Pillow是PIL的一个友好分支，提供了相同的功能，并添加了一些新的特性和改进。

#### 24.1.1.1 安装Pillow

我们可以使用pip来安装Pillow：

```bash
pip install Pillow
```

#### 24.1.1.2 基本图像操作

下面是一些使用Pillow进行基本图像操作的例子：

```python
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import matplotlib.pyplot as plt

# 读取图像
image = Image.open("example.jpg")

# 显示图像信息
print(f"图像格式: {image.format}")
print(f"图像大小: {image.size}")  # (width, height)
print(f"图像模式: {image.mode}")  # RGB, RGBA, L等

# 显示图像
# 在Jupyter Notebook中，可以直接使用image.show()或者matplotlib
plt.imshow(image)
plt.axis('off')  # 不显示坐标轴
plt.show()

# 保存图像
image.save("output.png")

# 调整图像大小
resized_image = image.resize((300, 200))  # (width, height)
resized_image.save("resized.jpg")

# 裁剪图像
# crop(box)方法的参数是一个元组(左, 上, 右, 下)
cropped_image = image.crop((100, 100, 400, 300))
cropped_image.save("cropped.jpg")

# 旋转图像
# rotate(angle)方法的参数是旋转角度（逆时针方向）
rotated_image = image.rotate(45)  # 旋转45度
rotated_image.save("rotated.jpg")

# 翻转图像
# transpose(method)方法可以水平或垂直翻转图像
flipped_image = image.transpose(Image.FLIP_LEFT_RIGHT)  # 水平翻转
flipped_image.save("flipped_horizontal.jpg")

flipped_image = image.transpose(Image.FLIP_TOP_BOTTOM)  # 垂直翻转
flipped_image.save("flipped_vertical.jpg")

# 图像滤波（模糊、锐化等）
blurred_image = image.filter(ImageFilter.BLUR)  # 模糊
blurred_image.save("blurred.jpg")

sharpened_image = image.filter(ImageFilter.SHARPEN)  # 锐化
sharpened_image.save("sharpened.jpg")

edged_image = image.filter(ImageFilter.FIND_EDGES)  # 边缘检测
edged_image.save("edged.jpg")

# 图像增强
# 亮度增强
enhancer = ImageEnhance.Brightness(image)
brightened_image = enhancer.enhance(1.5)  # 亮度增加50%
brightened_image.save("brightened.jpg")

# 对比度增强
enhancer = ImageEnhance.Contrast(image)
contrasted_image = enhancer.enhance(1.5)  # 对比度增加50%
contrasted_image.save("contrasted.jpg")

# 色彩增强
enhancer = ImageEnhance.Color(image)
colored_image = enhancer.enhance(1.5)  # 色彩饱和度增加50%
colored_image.save("colored.jpg")

# 图像模式转换
# 转换为灰度图像
grayscale_image = image.convert("L")
grayscale_image.save("grayscale.jpg")

# 转换为RGBA模式（带透明度）
rgba_image = image.convert("RGBA")
rgba_image.save("rgba.png")

# 图像叠加
# 创建一个新的透明图像
new_image = Image.new("RGBA", image.size, (255, 255, 255, 0))
# 粘贴图像
new_image.paste(image, (0, 0))
# 可以粘贴另一个图像到指定位置
# new_image.paste(another_image, (x, y), mask=another_image)  # mask参数用于指定透明度
new_image.save("overlay.png")

# 图像运算
# 注意：需要两个图像大小相同
if image.size == another_image.size:
    # 图像加法
    added_image = Image.blend(image.convert("RGBA"), another_image.convert("RGBA"), 0.5)
    added_image.save("added.png")

# 图像直方图
# 计算直方图
histogram = image.histogram()
# 显示直方图
plt.figure()
plt.plot(histogram[:256], color='red', label='Red')
plt.plot(histogram[256:512], color='green', label='Green')
plt.plot(histogram[512:768], color='blue', label='Blue')
plt.title('Image Histogram')
plt.xlabel('Pixel Value')
plt.ylabel('Frequency')
plt.legend()
plt.show()
```

#### 24.1.1.3 图像绘制

Pillow还提供了一些基本的图像绘制功能，我们可以使用`ImageDraw`模块在图像上绘制各种图形，如线条、矩形、圆形、文本等。

```python
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt

# 创建一个新图像
image = Image.new("RGB", (500, 400), color="white")

# 创建绘制对象
draw = ImageDraw.Draw(image)

# 绘制线条
draw.line([(50, 50), (450, 50)], fill="red", width=5)
# 绘制多条线条
draw.line([(50, 100), (250, 150), (450, 100)], fill="blue", width=3)

# 绘制矩形
draw.rectangle([(50, 200), (200, 300)], fill="green", outline="black", width=2)
# 绘制圆角矩形
# 在Pillow 8.0.0及以上版本中，可以使用radius参数设置圆角
# draw.rectangle([(250, 200), (400, 300)], fill="yellow", outline="black", width=2, radius=10)

# 绘制圆形
draw.ellipse([(50, 320), (150, 400)], fill="purple", outline="black", width=2)
# 绘制椭圆
draw.ellipse([(200, 320), (400, 400)], fill="orange", outline="black", width=2)

# 绘制多边形
points = [(100, 120), (150, 180), (50, 180)]
draw.polygon(points, fill="pink", outline="black", width=2)

# 绘制文本
# 尝试加载系统字体，如果失败则使用默认字体
try:
    font = ImageFont.truetype("arial.ttf", 24)  # 字体名称和大小
except IOError:
    font = ImageFont.load_default()

draw.text((50, 150), "Hello, Pillow!", fill="black", font=font)
# 绘制多行文本
text = "This is a multi-line\ntext example."  # 使用\n换行
lines = text.split('\n')
y_position = 180
for line in lines:
    draw.text((250, y_position), line, fill="black", font=font)
    y_position += 30  # 每行之间的垂直间距

# 绘制弧
# 参数：[x1, y1, x2, y2], start, end, fill, width
draw.arc([(300, 50), (400, 150)], 0, 180, fill="brown", width=3)  # 0到180度的弧

# 绘制弦
# 参数：[x1, y1, x2, y2], start, end, fill, outline, width
draw.chord([(300, 50), (400, 150)], 180, 360, fill="gray", outline="black", width=2)  # 180到360度的弦

# 绘制扇形
# 参数：[x1, y1, x2, y2], start, end, fill, outline, width
draw.pieslice([(300, 50), (400, 150)], 45, 135, fill="cyan", outline="black", width=2)  # 45到135度的扇形

# 显示图像
plt.imshow(image)
plt.axis('off')
plt.show()

# 保存图像
image.save("drawing_example.png")
```

#### 24.1.1.4 高级图像操作

除了基本的图像操作之外，Pillow还提供了一些高级的图像操作，如缩略图生成、图像序列处理、图像变形等。

```python
from PIL import Image, ImageSequence, ImageTransform
import matplotlib.pyplot as plt

# 生成缩略图
# thumbnail(size)方法会修改原图像，使其适应指定的大小（保持宽高比）
image = Image.open("example.jpg")
image.thumbnail((100, 100))  # 生成最大边长为100的缩略图
image.save("thumbnail.jpg")

# 处理图像序列（如GIF动画）
try:
    gif = Image.open("example.gif")
    # 检查是否是多帧图像
    if gif.is_animated:
        frames = []
        # 遍历所有帧
        for frame in ImageSequence.Iterator(gif):
            frames.append(frame.copy())
        # 显示第一帧
        plt.imshow(frames[0])
        plt.axis('off')
        plt.show()
        # 保存为新的GIF动画
        frames[0].save("output.gif", save_all=True, append_images=frames[1:], duration=gif.info['duration'], loop=0)
except IOError:
    print("GIF文件不存在或无法打开")

# 图像变形
# 使用Perspective变换
def perspective_transform(image):
    width, height = image.size
    # 定义源点和目标点
    # 源点：左上、右上、左下、右下
    src_points = [(0, 0), (width, 0), (0, height), (width, height)]
    # 目标点：可以根据需要调整
    dst_points = [(50, 50), (width-50, 20), (20, height-20), (width-20, height-50)]
    # 获取变换矩阵
    transform = ImageTransform.PerspectiveTransform(src_points, dst_points)
    # 应用变换
    transformed_image = image.transform((width, height), Image.PERSPECTIVE, transform, Image.BICUBIC)
    return transformed_image

transformed_image = perspective_transform(image)
transformed_image.save("perspective.jpg")

# 图像合成
# 创建一个新图像
background = Image.new("RGB", (800, 600), color="skyblue")
# 打开前景图像
foreground = Image.open("example.jpg")
# 调整前景图像大小
foreground = foreground.resize((300, 200))
# 将前景图像粘贴到背景图像上
background.paste(foreground, (250, 200), foreground if foreground.mode == "RGBA" else None)
# 保存合成后的图像
background.save("composite.jpg")

# 颜色量化
# 将图像转换为有限的颜色数量
quantized_image = image.quantize(colors=16)  # 量化为16种颜色
quantized_image.save("quantized.png")

# 图像噪点
# 可以使用Image.effect_noise()方法添加噪点
noise = Image.effect_noise((256, 256), 10)
noise.save("noise.png")
```

### 24.1.2 其他图形处理库

除了Pillow之外，Python还有许多其他的图形处理库，下面我们将简要介绍其中的一些。

#### 24.1.2.1 OpenCV

OpenCV（Open Source Computer Vision Library）是一个开源的计算机视觉库，它提供了丰富的图像处理和计算机视觉算法，如特征检测、目标识别、图像分割等。OpenCV的Python绑定称为`cv2`。

安装OpenCV：

```bash
pip install opencv-python
```

一个简单的OpenCV程序示例：

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 读取图像
# 注意：OpenCV默认使用BGR格式，而matplotlib使用RGB格式
image = cv2.imread("example.jpg")

# 将BGR转换为RGB以便在matplotlib中正确显示
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# 显示图像
plt.imshow(image_rgb)
plt.axis('off')
plt.show()

# 图像缩放
resized = cv2.resize(image, (300, 200))  # (width, height)

# 图像裁剪
# crop[start_y:end_y, start_x:end_x]
cropped = image[100:300, 100:400]

# 图像旋转
# 获取图像大小
h, w = image.shape[:2]
# 计算旋转中心、角度和缩放因子
center = (w // 2, h // 2)
rotation_matrix = cv2.getRotationMatrix2D(center, 45, 1.0)  # 旋转45度，缩放因子为1.0
rotated = cv2.warpAffine(image, rotation_matrix, (w, h))

# 图像滤波
# 高斯模糊
blurred = cv2.GaussianBlur(image, (5, 5), 0)  # 内核大小为5x5

# 中值模糊
median_blurred = cv2.medianBlur(image, 5)  # 内核大小为5

# 边缘检测
edges = cv2.Canny(image, 100, 200)  # 阈值100和200

# 图像阈值化
# 转换为灰度图像
grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# 阈值化
ret, thresholded = cv2.threshold(grayscale, 127, 255, cv2.THRESH_BINARY)

# 图像形态学操作
# 定义结构元素
kernel = np.ones((5, 5), np.uint8)
# 腐蚀
eroded = cv2.erode(thresholded, kernel, iterations=1)
# 膨胀
dilated = cv2.dilate(thresholded, kernel, iterations=1)
# 开运算（先腐蚀后膨胀）
opening = cv2.morphologyEx(thresholded, cv2.MORPH_OPEN, kernel)
# 闭运算（先膨胀后腐蚀）
closing = cv2.morphologyEx(thresholded, cv2.MORPH_CLOSE, kernel)

# 保存图像
cv2.imwrite("opencv_example.jpg", image)

# 显示多个图像
images = [
    image_rgb, 
    cv2.cvtColor(blurred, cv2.COLOR_BGR2RGB), 
    cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB), 
    cv2.cvtColor(thresholded, cv2.COLOR_GRAY2RGB)
]
titles = ["Original", "Blurred", "Edges", "Thresholded"]

plt.figure(figsize=(12, 8))
for i in range(4):
    plt.subplot(2, 2, i+1)
    plt.imshow(images[i])
    plt.title(titles[i])
    plt.axis('off')
plt.tight_layout()
plt.show()
```

#### 24.1.2.2 scikit-image

scikit-image是一个基于SciPy的图像处理库，它提供了简单而高效的工具用于图像处理和计算机视觉。scikit-image的API设计简洁明了，易于使用。

安装scikit-image：

```bash
pip install scikit-image
```

一个简单的scikit-image程序示例：

```python
from skimage import io, filters, color, morphology, transform
import matplotlib.pyplot as plt

# 读取图像
image = io.imread("example.jpg")

# 显示图像
plt.imshow(image)
plt.axis('off')
plt.show()

# 图像缩放
resized = transform.resize(image, (200, 300))  # (height, width)

# 图像旋转
rotated = transform.rotate(image, 45)  # 旋转45度

# 转换为灰度图像
grayscale = color.rgb2gray(image)

# 边缘检测
edges = filters.sobel(grayscale)  # Sobel边缘检测

# 图像阈值化
threshold = filters.threshold_otsu(grayscale)  # 使用Otsu阈值法
thresholded = grayscale > threshold

# 图像形态学操作
# 腐蚀
eroded = morphology.binary_erosion(thresholded)
# 膨胀
dilated = morphology.binary_dilation(thresholded)
# 开运算（先腐蚀后膨胀）
opening = morphology.binary_opening(thresholded)
# 闭运算（先膨胀后腐蚀）
closing = morphology.binary_closing(thresholded)

# 保存图像
io.imsave("skimage_example.jpg", image)

# 显示多个图像
images = [
    image, 
    color.gray2rgb(edges), 
    color.gray2rgb(thresholded), 
    color.gray2rgb(opening)
]
titles = ["Original", "Edges", "Thresholded", "Opening"]

plt.figure(figsize=(12, 8))
for i in range(4):
    plt.subplot(2, 2, i+1)
    plt.imshow(images[i])
    plt.title(titles[i])
    plt.axis('off')
plt.tight_layout()
plt.show()
```

## 24.2 多媒体处理

多媒体处理是指对音频、视频等媒体进行各种操作，如读取、播放、修改、保存等。Python中有许多用于多媒体处理的库，下面我们将介绍其中的一些。

### 24.2.1 音频处理

音频处理是多媒体处理中的一个重要领域，它涉及音频的录制、播放、编辑、分析等。Python中有许多用于音频处理的库，如PyDub、librosa、pyaudio等。

#### 24.2.1.1 PyDub库

PyDub是一个简单而强大的音频处理库，它可以用于读取、修改和保存各种音频文件格式。PyDub基于FFmpeg，因此需要先安装FFmpeg。

安装PyDub：

```bash
pip install pydub
```

安装FFmpeg：
- Windows：可以从FFmpeg官网下载二进制文件，然后将其添加到系统路径中。
- macOS：可以使用Homebrew安装：`brew install ffmpeg`
- Linux：可以使用包管理器安装，如Ubuntu：`sudo apt-get install ffmpeg`

一个简单的PyDub程序示例：

```python
from pydub import AudioSegment
from pydub.playback import play
import matplotlib.pyplot as plt
import numpy as np

# 读取音频文件
# 支持的格式：mp3, wav, ogg, flac等
# 注意：某些格式可能需要额外的编解码器支持
try:
    audio = AudioSegment.from_file("example.mp3")
    # 或者直接指定格式
    # audio = AudioSegment.from_mp3("example.mp3")
    # audio = AudioSegment.from_wav("example.wav")
    
    # 音频信息
    print(f"音频长度: {len(audio)}毫秒")
    print(f"音频通道数: {audio.channels}")
    print(f"音频采样宽度: {audio.sample_width}字节")
    print(f"音频帧速率: {audio.frame_rate}Hz")
    
    # 播放音频
    # play(audio)  # 取消注释以播放音频
    
    # 音频切片
    # 截取前5秒的音频
    first_5_seconds = audio[:5000]  # 毫秒
    # 截取从10秒到20秒的音频
    middle_part = audio[10000:20000]
    
    # 调整音量
    # 增加6dB
    louder = audio + 6
    # 减小6dB
    quieter = audio - 6
    
    # 淡入淡出
    # 淡入2秒
    fade_in = audio.fade_in(2000)
    # 淡出2秒
    fade_out = audio.fade_out(2000)
    
    # 调整速度
    # 1.5倍速度
    faster = audio.speedup(playback_speed=1.5)
    # 0.5倍速度
    slower = audio.speedup(playback_speed=0.5)
    
    # 音频反转
    reversed_audio = audio.reverse()
    
    # 音频拼接
    concatenated = first_5_seconds + middle_part
    
    # 音频混合
    # 注意：两个音频需要长度相同
    if len(first_5_seconds) == len(middle_part):
        mixed = first_5_seconds.overlay(middle_part)
    
    # 转换音频格式
    # 导出为wav格式
    audio.export("output.wav", format="wav")
    # 导出为ogg格式
    audio.export("output.ogg", format="ogg")
    
    # 转换采样率
    audio = audio.set_frame_rate(44100)  # 设置为44.1kHz
    
    # 转换通道数
    # 转换为单声道
    mono_audio = audio.set_channels(1)
    # 转换为立体声
    stereo_audio = audio.set_channels(2)
    
    # 可视化音频波形
    # 获取音频数据
    samples = np.array(audio.get_array_of_samples())
    # 计算时间轴
    time = np.linspace(0, len(audio) / 1000, num=len(samples))
    
    # 绘制波形图
    plt.figure(figsize=(12, 6))
    plt.plot(time, samples)
    plt.title('Audio Waveform')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.show()
    
except FileNotFoundError:
    print("音频文件不存在")
except Exception as e:
    print(f"处理音频时出错: {e}")
```

#### 24.2.1.2 librosa库

librosa是一个用于音乐和音频分析的Python库，它提供了构建音乐信息检索系统所需的功能，如特征提取、节拍跟踪、音高检测等。

安装librosa：

```bash
pip install librosa matplotlib
```

一个简单的librosa程序示例：

```python
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

# 读取音频文件
# 参数：filename, sr=None（采样率，None表示使用原始采样率）
try:
    y, sr = librosa.load("example.mp3", sr=None)
    
    # 音频信息
    print(f"音频长度: {librosa.get_duration(y=y, sr=sr)}秒")
    print(f"音频采样率: {sr}Hz")
    print(f"音频样本数: {len(y)}")
    
    # 绘制波形图
    plt.figure(figsize=(12, 6))
    librosa.display.waveshow(y, sr=sr)
    plt.title('Audio Waveform')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.show()
    
    # 计算并绘制频谱图
    X = librosa.stft(y)
    Xdb = librosa.amplitude_to_db(abs(X))
    
    plt.figure(figsize=(12, 6))
    librosa.display.specshow(Xdb, sr=sr, x_axis='time', y_axis='hz')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Spectrogram')
    plt.show()
    
    # 计算梅尔频谱图
    S = librosa.feature.melspectrogram(y=y, sr=sr)
    S_dB = librosa.power_to_db(S, ref=np.max)
    
    plt.figure(figsize=(12, 6))
    librosa.display.specshow(S_dB, sr=sr, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Mel Spectrogram')
    plt.show()
    
    # 提取MFCC特征
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    
    plt.figure(figsize=(12, 6))
    librosa.display.specshow(mfccs, sr=sr, x_axis='time')
    plt.colorbar()
    plt.title('MFCC')
    plt.show()
    
    # 节拍跟踪
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    print(f"估计的节拍速度: {tempo} BPM")
    
    # 将节拍帧转换为时间
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)
    print(f"节拍时间点: {beat_times}")
    
    # 音高检测
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    
    # 提取chroma特征
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    
    plt.figure(figsize=(12, 6))
    librosa.display.specshow(chroma, y_axis='chroma', x_axis='time')
    plt.colorbar()
    plt.title('Chroma')
    plt.show()
    
except FileNotFoundError:
    print("音频文件不存在")
except Exception as e:
    print(f"处理音频时出错: {e}")
```

#### 24.2.1.3 pyaudio库

pyaudio是一个用于录制和播放音频的Python库，它提供了跨平台的音频I/O功能。

安装pyaudio：

```bash
pip install pyaudio
```

一个简单的pyaudio程序示例：

```python
import pyaudio
import wave
import numpy as np
import matplotlib.pyplot as plt

# 录制音频
def record_audio(filename, duration=5, rate=44100, channels=1, format=pyaudio.paInt16):
    """录制音频并保存为WAV文件"""
    p = pyaudio.PyAudio()
    
    # 打开音频流
    stream = p.open(format=format, 
                    channels=channels, 
                    rate=rate, 
                    input=True, 
                    frames_per_buffer=1024)
    
    print(f"开始录制音频，时长{duration}秒...")
    
    frames = []
    
    # 录制指定时长的音频
    for i in range(0, int(rate / 1024 * duration)):
        data = stream.read(1024)
        frames.append(data)
    
    print("录制结束！")
    
    # 停止并关闭音频流
    stream.stop_stream()
    stream.close()
    p.terminate()
    
    # 保存音频文件
    wf = wave.open(filename, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(format))
    wf.setframerate(rate)
    wf.writeframes(b''.join(frames))
    wf.close()

# 播放音频
def play_audio(filename):
    """播放WAV音频文件"""
    wf = wave.open(filename, 'rb')
    
    p = pyaudio.PyAudio()
    
    # 打开音频流
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()), 
                    channels=wf.getnchannels(), 
                    rate=wf.getframerate(), 
                    output=True)
    
    print(f"开始播放音频...")
    
    # 读取并播放音频数据
    data = wf.readframes(1024)
    while data:
        stream.write(data)
        data = wf.readframes(1024)
    
    print("播放结束！")
    
    # 停止并关闭音频流
    stream.stop_stream()
    stream.close()
    p.terminate()
    wf.close()

# 可视化音频文件
def visualize_audio(filename):
    """可视化WAV音频文件的波形"""
    wf = wave.open(filename, 'rb')
    
    # 获取音频参数
    n_channels = wf.getnchannels()
    sample_width = wf.getsampwidth()
    framerate = wf.getframerate()
    n_frames = wf.getnframes()
    
    print(f"音频信息:")
    print(f"  通道数: {n_channels}")
    print(f"  采样宽度: {sample_width}字节")
    print(f"  帧速率: {framerate}Hz")
    print(f"  帧数: {n_frames}")
    print(f"  时长: {n_frames / framerate:.2f}秒")
    
    # 读取音频数据
    data = wf.readframes(n_frames)
    wf.close()
    
    # 将二进制数据转换为数值
    if sample_width == 1:
        # 8位无符号整数
        audio_data = np.frombuffer(data, dtype=np.uint8) - 128  # 转换为有符号
    elif sample_width == 2:
        # 16位有符号整数
        audio_data = np.frombuffer(data, dtype=np.int16)
    elif sample_width == 4:
        # 32位有符号整数
        audio_data = np.frombuffer(data, dtype=np.int32)
    else:
        raise ValueError(f"不支持的采样宽度: {sample_width}")
    
    # 如果是立体声，取第一个通道
    if n_channels > 1:
        audio_data = audio_data[::n_channels]
    
    # 计算时间轴
    time = np.linspace(0, n_frames / framerate, num=len(audio_data))
    
    # 绘制波形图
    plt.figure(figsize=(12, 6))
    plt.plot(time, audio_data)
    plt.title('Audio Waveform')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.show()

# 使用示例
if __name__ == "__main__":
    filename = "recorded_audio.wav"
    
    # 录制音频
    record_audio(filename, duration=5)
    
    # 播放音频
    play_audio(filename)
    
    # 可视化音频
    visualize_audio(filename)
```

### 24.2.2 视频处理

视频处理是多媒体处理中的另一个重要领域，它涉及视频的读取、播放、编辑、分析等。Python中有许多用于视频处理的库，如OpenCV、MoviePy等。

#### 24.2.2.1 MoviePy库

MoviePy是一个用于视频编辑的Python库，它可以用于剪辑、拼接、调整大小、添加效果、添加音频等操作。

安装MoviePy：

```bash
pip install moviepy
```

一个简单的MoviePy程序示例：

```python
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips, CompositeVideoClip, TextClip, ColorClip
import matplotlib.pyplot as plt
import numpy as np

# 读取视频文件
try:
    video = VideoFileClip("example.mp4")
    
    # 视频信息
    print(f"视频时长: {video.duration}秒")
    print(f"视频大小: {video.size}")  # (width, height)
    print(f"视频帧率: {video.fps}")
    print(f"视频比特率: {video.bitrate}")
    
    # 预览视频（在Jupyter Notebook中）
    # video.ipython_display()
    
    # 视频剪辑
    # 截取前5秒的视频
    first_5_seconds = video.subclip(0, 5)
    # 截取从10秒到20秒的视频
    middle_part = video.subclip(10, 20)
    
    # 调整视频大小
    resized = video.resize(width=320)  # 宽度为320，高度自动计算
    # 或者指定宽度和高度
    # resized = video.resize((320, 240))
    
    # 调整视频速度
    # 2倍速度
    faster = video.speedx(2)
    # 0.5倍速度
    slower = video.speedx(0.5)
    
    # 视频旋转
    rotated = video.rotate(90)  # 顺时针旋转90度
    
    # 视频反转
    reversed_video = video.fx(vfx.time_mirror)
    
    # 视频裁剪
    # crop(x1=None, y1=None, x2=None, y2=None, width=None, height=None, x_center=None, y_center=None)
    cropped = video.crop(x1=100, y1=100, x2=400, y2=300)  # 裁剪指定区域
    
    # 添加音频
    # 注意：音频文件需要与视频长度相同或较短
    try:
        audio = AudioFileClip("example.mp3")
        # 如果音频比视频长，截取与视频相同长度的音频
        if audio.duration > video.duration:
            audio = audio.subclip(0, video.duration)
        # 设置视频音频
        video_with_new_audio = video.set_audio(audio)
    except FileNotFoundError:
        print("音频文件不存在，跳过添加音频步骤")
    
    # 提取音频
    audio = video.audio
    audio.write_audiofile("extracted_audio.mp3")
    
    # 视频拼接
    concatenated = concatenate_videoclips([first_5_seconds, middle_part])
    
    # 视频叠加
    # 创建一个彩色背景
    color_clip = ColorClip(size=(320, 240), color=(255, 0, 0), duration=5)
    # 创建一个文本剪辑
    text_clip = TextClip("Hello, MoviePy!", fontsize=24, color='white', size=(320, 50))
    text_clip = text_clip.set_position('center').set_duration(5)
    # 合成视频
    composite = CompositeVideoClip([color_clip, text_clip])
    
    # 保存视频
    # 注意：可能需要安装额外的编解码器
    video.write_videofile("output.mp4")
    # 保存为GIF
    # video.write_gif("output.gif")
    
    # 提取视频帧
    # 每隔1秒提取一帧
    for i, frame in enumerate(video.iter_frames(fps=1)):
        # frame是一个numpy数组，形状为(height, width, 3)
        # 可以使用matplotlib显示
        plt.figure()
        plt.imshow(frame)
        plt.axis('off')
        plt.title(f'Frame {i}')
        plt.show()
        # 保存帧为图像文件
        # plt.imsave(f'frame_{i}.jpg', frame)
        # 只显示前5帧
        if i >= 4:
            break
    
    # 关闭视频文件
    video.close()
    
except FileNotFoundError:
    print("视频文件不存在")
except Exception as e:
    print(f"处理视频时出错: {e}")
```

#### 24.2.2.2 OpenCV视频处理

OpenCV也可以用于视频处理，它提供了读取、显示、保存视频的功能，以及一些基本的视频分析功能。

一个简单的OpenCV视频处理程序示例：

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 读取视频文件
def read_video(filename):
    """读取视频文件"""
    cap = cv2.VideoCapture(filename)
    
    # 检查视频是否成功打开
    if not cap.isOpened():
        print(f"无法打开视频文件: {filename}")
        return None
    
    # 获取视频参数
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"视频信息:")
    print(f"  帧率: {fps} FPS")
    print(f"  宽度: {width}")
    print(f"  高度: {height}")
    print(f"  总帧数: {frame_count}")
    print(f"  时长: {frame_count / fps:.2f}秒")
    
    return cap, fps, width, height, frame_count

# 播放视频
def play_video(cap):
    """播放视频"""
    print("开始播放视频...")
    
    while cap.isOpened():
        # 读取一帧
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 显示帧
        cv2.imshow('Video', frame)
        
        # 按'q'键退出
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    
    print("播放结束！")
    
    # 释放资源
    cap.release()
    cv2.destroyAllWindows()

# 提取视频帧
def extract_frames(cap, output_dir, frame_interval=1):
    """提取视频帧并保存为图像文件"""
    import os
    
    # 确保输出目录存在
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    frame_count = 0
    saved_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 每隔frame_interval帧保存一帧
        if frame_count % frame_interval == 0:
            frame_filename = os.path.join(output_dir, f"frame_{saved_count:04d}.jpg")
            cv2.imwrite(frame_filename, frame)
            saved_count += 1
            
            # 显示进度
            if saved_count % 100 == 0:
                print(f"已保存 {saved_count} 帧")
        
        frame_count += 1
    
    print(f"总共保存了 {saved_count} 帧")
    
    # 释放资源
    cap.release()

# 处理视频
def process_video(input_filename, output_filename):
    """处理视频并保存结果"""
    cap = cv2.VideoCapture(input_filename)
    
    if not cap.isOpened():
        print(f"无法打开视频文件: {input_filename}")
        return
    
    # 获取视频参数
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # 创建VideoWriter对象
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # 使用MP4编解码器
    out = cv2.VideoWriter(output_filename, fourcc, fps, (width, height))
    
    print("开始处理视频...")
    
    frame_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 处理帧（例如，转换为灰度）
        # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # 转换回BGR以便保存
        # processed_frame = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
        
        # 或者应用其他处理，如边缘检测
        # edges = cv2.Canny(frame, 100, 200)
        # processed_frame = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
        
        # 简单起见，这里直接使用原始帧
        processed_frame = frame
        
        # 写入处理后的帧
        out.write(processed_frame)
        
        frame_count += 1
        
        # 显示进度
        if frame_count % 100 == 0:
            print(f"已处理 {frame_count} 帧")
        
        # 可选：显示处理后的视频
        # cv2.imshow('Processed Video', processed_frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break
    
    print(f"视频处理完成，共处理了 {frame_count} 帧")
    
    # 释放资源
    cap.release()
    out.release()
    # cv2.destroyAllWindows()

# 从摄像头捕获视频
def capture_from_camera(output_filename, duration=10):
    """从摄像头捕获视频并保存"""
    cap = cv2.VideoCapture(0)  # 0表示默认摄像头
    
    if not cap.isOpened():
        print("无法打开摄像头")
        return
    
    # 获取摄像头参数
    fps = 20.0  # 可以尝试调整帧率
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # 创建VideoWriter对象
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_filename, fourcc, fps, (width, height))
    
    print(f"开始从摄像头捕获视频，时长{duration}秒...")
    
    start_time = cv2.getTickCount()
    
    while (cv2.getTickCount() - start_time) / cv2.getTickFrequency() < duration:
        ret, frame = cap.read()
        
        if not ret:
            print("无法获取视频帧")
            break
        
        # 显示捕获的视频
        cv2.imshow('Camera', frame)
        
        # 写入视频文件
        out.write(frame)
        
        # 按'q'键提前结束
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    print("视频捕获完成！")
    
    # 释放资源
    cap.release()
    out.release()
    cv2.destroyAllWindows()

# 使用示例
if __name__ == "__main__":
    # 读取视频文件
    # cap, fps, width, height, frame_count = read_video("example.mp4")
    # 
    # # 播放视频
    # play_video(cap)
    # 
    # # 重新打开视频文件以提取帧
    # cap, _, _, _, _ = read_video("example.mp4")
    # extract_frames(cap, "frames", frame_interval=30)  # 每秒提取一帧（假设帧率为30FPS）
    # 
    # # 处理视频
    # process_video("example.mp4", "processed.mp4")
    
    # 从摄像头捕获视频
    capture_from_camera("camera_video.mp4", duration=5)
```

## 24.3 数据可视化

数据可视化是指将数据以图形或图表的形式展示出来，以便更好地理解和分析数据。Python中有许多用于数据可视化的库，如matplotlib、seaborn、plotly等。

### 24.3.1 matplotlib库

matplotlib是Python中最常用的数据可视化库之一，它提供了丰富的绘图功能，可以创建各种类型的图表，如折线图、散点图、柱状图、饼图等。

安装matplotlib：

```bash
pip install matplotlib
```

一个简单的matplotlib程序示例：

```python
import matplotlib.pyplot as plt
import numpy as np

# 设置中文显示
plt.rcParams["font.family"] = ["SimHei", "WenQuanYi Micro Hei", "Heiti TC"]
plt.rcParams["axes.unicode_minus"] = False  # 解决负号显示问题

# 1. 折线图
# 生成数据
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 创建图形和子图
plt.figure(figsize=(10, 6))

# 绘制折线图
plt.plot(x, y1, label="sin(x)", color="blue", linewidth=2, marker="o", markersize=5)
plt.plot(x, y2, label="cos(x)", color="red", linewidth=2, marker="s", markersize=5)

# 添加标题和标签
plt.title("正弦和余弦函数", fontsize=16)
plt.xlabel("x", fontsize=14)
plt.ylabel("y", fontsize=14)

# 添加图例
plt.legend(fontsize=12)

# 添加网格
plt.grid(True, linestyle="--", alpha=0.7)

# 设置坐标轴范围
plt.xlim(0, 10)
plt.ylim(-1.2, 1.2)

# 保存图形
plt.savefig("line_plot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 2. 散点图
# 生成随机数据
np.random.seed(42)  # 设置随机种子，保证结果可重现
x = np.random.randn(100)
y = np.random.randn(100)
colors = np.random.randn(100)  # 颜色数据
sizes = 100 * np.random.rand(100)  # 点的大小

# 创建图形和子图
plt.figure(figsize=(10, 6))

# 绘制散点图
scatter = plt.scatter(x, y, c=colors, s=sizes, alpha=0.7, cmap="viridis", edgecolors="black", linewidths=1)

# 添加颜色条
plt.colorbar(scatter, label="颜色值")

# 添加标题和标签
plt.title("散点图示例", fontsize=16)
plt.xlabel("X轴", fontsize=14)
plt.ylabel("Y轴", fontsize=14)

# 添加网格
plt.grid(True, linestyle="--", alpha=0.7)

# 保存图形
plt.savefig("scatter_plot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 3. 柱状图
# 生成数据
categories = ["A", "B", "C", "D", "E"]
values1 = [3, 7, 2, 5, 8]
values2 = [4, 2, 6, 3, 5]

# 创建图形和子图
plt.figure(figsize=(10, 6))

# 设置柱状图的位置
bar_width = 0.35
x = np.arange(len(categories))

# 绘制柱状图
plt.bar(x - bar_width/2, values1, width=bar_width, label="数据1", color="blue", edgecolor="black")
plt.bar(x + bar_width/2, values2, width=bar_width, label="数据2", color="red", edgecolor="black")

# 添加标题和标签
plt.title("柱状图示例", fontsize=16)
plt.xlabel("类别", fontsize=14)
plt.ylabel("数值", fontsize=14)

# 设置X轴刻度标签
plt.xticks(x, categories, fontsize=12)

# 添加图例
plt.legend(fontsize=12)

# 添加网格（仅Y轴）
plt.grid(True, axis="y", linestyle="--", alpha=0.7)

# 保存图形
plt.savefig("bar_plot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 4. 直方图
# 生成随机数据（正态分布）
np.random.seed(42)
data = np.random.normal(0, 1, 1000)  # 均值为0，标准差为1的1000个随机数

# 创建图形和子图
plt.figure(figsize=(10, 6))

# 绘制直方图
n, bins, patches = plt.hist(data, bins=30, density=True, alpha=0.7, color="blue", edgecolor="black")

# 添加正态分布曲线
mu, sigma = 0, 1
x = np.linspace(mu - 4*sigma, mu + 4*sigma, 100)
y = (1/(sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu)/sigma)**2)
plt.plot(x, y, color="red", linewidth=2, label="正态分布曲线")

# 添加标题和标签
plt.title("直方图示例（正态分布数据）", fontsize=16)
plt.xlabel("数值", fontsize=14)
plt.ylabel("频率密度", fontsize=14)

# 添加图例
plt.legend(fontsize=12)

# 添加网格
plt.grid(True, linestyle="--", alpha=0.7)

# 保存图形
plt.savefig("histogram.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 5. 饼图
# 生成数据
labels = ["类别A", "类别B", "类别C", "类别D"]
sizes = [30, 25, 20, 25]  # 百分比
explode = (0.1, 0, 0, 0)  # 突出显示第一个扇形
colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"]

# 创建图形和子图
plt.figure(figsize=(8, 8))

# 绘制饼图
plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct="%1.1f%%", 
        shadow=True, startangle=90, wedgeprops={"edgecolor": "black", "linewidth": 1})

# 设置饼图为正圆形
plt.axis("equal")

# 添加标题
plt.title("饼图示例", fontsize=16)

# 保存图形
plt.savefig("pie_chart.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 6. 箱线图
# 生成随机数据
np.random.seed(42)
data1 = np.random.normal(0, 1, 100)
data2 = np.random.normal(2, 1, 100)
data3 = np.random.normal(-2, 1.5, 100)

data = [data1, data2, data3]
labels = ["数据集1", "数据集2", "数据集3"]

# 创建图形和子图
plt.figure(figsize=(10, 6))

# 绘制箱线图
boxplot = plt.boxplot(data, labels=labels, patch_artist=True, 
                      boxprops={"facecolor": "lightblue", "edgecolor": "black"}, 
                      whiskerprops={"color": "black"}, 
                      capprops={"color": "black"}, 
                      medianprops={"color": "red", "linewidth": 2})

# 添加标题和标签
plt.title("箱线图示例", fontsize=16)
plt.xlabel("数据集", fontsize=14)
plt.ylabel("数值", fontsize=14)

# 添加网格
plt.grid(True, linestyle="--", alpha=0.7)

# 保存图形
plt.savefig("boxplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 7. 热力图
# 生成随机数据
np.random.seed(42)
data = np.random.rand(10, 10)

# 创建图形和子图
plt.figure(figsize=(10, 8))

# 绘制热力图
heatmap = plt.imshow(data, cmap="viridis", aspect="auto")

# 添加颜色条
plt.colorbar(heatmap, label="数值")

# 添加标题
plt.title("热力图示例", fontsize=16)

# 设置坐标轴刻度标签
plt.xticks(np.arange(10), [f"X{i}" for i in range(10)], rotation=45)
plt.yticks(np.arange(10), [f"Y{i}" for i in range(10)])

# 在热力图上添加数值标签
for i in range(10):
    for j in range(10):
        plt.text(j, i, f"{data[i, j]:.2f}", ha="center", va="center", color="white" if data[i, j] > 0.5 else "black")

# 保存图形
plt.savefig("heatmap.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 8. 多子图
# 创建图形和子图
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 子图1：折线图
x = np.linspace(0, 10, 100)
axes[0, 0].plot(x, np.sin(x), color="blue")
axes[0, 0].set_title("正弦函数")
axes[0, 0].set_xlabel("x")
axes[0, 0].set_ylabel("sin(x)")
axes[0, 0].grid(True)

# 子图2：散点图
np.random.seed(42)
x = np.random.randn(100)
y = np.random.randn(100)
axes[0, 1].scatter(x, y, color="red", alpha=0.7)
axes[0, 1].set_title("散点图")
axes[0, 1].set_xlabel("X轴")
axes[0, 1].set_ylabel("Y轴")
axes[0, 1].grid(True)

# 子图3：柱状图
categories = ["A", "B", "C", "D"]
values = [3, 7, 2, 5]
axes[1, 0].bar(categories, values, color="green")
axes[1, 0].set_title("柱状图")
axes[1, 0].set_xlabel("类别")
axes[1, 0].set_ylabel("数值")
axes[1, 0].grid(True, axis="y")

# 子图4：饼图
labels = ["类别1", "类别2", "类别3"]
sizes = [40, 30, 30]
axes[1, 1].pie(sizes, labels=labels, autopct="%1.1f%%", shadow=True)
axes[1, 1].set_title("饼图")
axes[1, 1].axis("equal")

# 调整子图之间的间距
plt.tight_layout()

# 添加总标题
plt.suptitle("多子图示例", fontsize=16, y=0.98)

# 保存图形
plt.savefig("subplots.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()
```

### 24.3.2 seaborn库

seaborn是一个基于matplotlib的高级数据可视化库，它提供了更加美观和统计上有意义的图表样式，以及一些高级的统计绘图功能。

安装seaborn：

```bash
pip install seaborn pandas
```

一个简单的seaborn程序示例：

```python
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 设置中文显示
plt.rcParams["font.family"] = ["SimHei", "WenQuanYi Micro Hei", "Heiti TC"]
plt.rcParams["axes.unicode_minus"] = False  # 解决负号显示问题

# 设置seaborn样式
sns.set_style("whitegrid")  # 可选：white, dark, whitegrid, darkgrid, ticks

# 1. 散点图（带回归直线）
# 生成随机数据
np.random.seed(42)
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)

# 创建DataFrame
df = pd.DataFrame({"x": x, "y": y})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制散点图（带回归直线）
sns.regplot(x="x", y="y", data=df, scatter_kws={"alpha": 0.7}, line_kws={"color": "red"})

# 添加标题
plt.title("散点图（带回归直线）", fontsize=16)

# 保存图形
plt.savefig("seaborn_regplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 2. 分类散点图
# 生成数据
np.random.seed(42)
categories = ["A", "B", "C", "D"]
values = []
groups = []
for category in categories:
    values.extend(np.random.normal(len(category) * 2, 1, 50))
    groups.extend([category] * 50)

# 创建DataFrame
df = pd.DataFrame({"类别": groups, "数值": values})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制分类散点图
sns.stripplot(x="类别", y="数值", data=df, jitter=True, alpha=0.7)

# 或者使用swarmplot（避免点重叠）
# sns.swarmplot(x="类别", y="数值", data=df, alpha=0.7)

# 添加标题
plt.title("分类散点图", fontsize=16)

# 保存图形
plt.savefig("seaborn_stripplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 3. 箱线图
# 使用上面的DataFrame
df = pd.DataFrame({"类别": groups, "数值": values})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制箱线图
sns.boxplot(x="类别", y="数值", data=df)

# 或者添加散点图
sns.boxplot(x="类别", y="数值", data=df)
sns.stripplot(x="类别", y="数值", data=df, color="black", size=3, jitter=True)

# 添加标题
plt.title("箱线图", fontsize=16)

# 保存图形
plt.savefig("seaborn_boxplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 4. 小提琴图
# 使用上面的DataFrame
df = pd.DataFrame({"类别": groups, "数值": values})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制小提琴图
sns.violinplot(x="类别", y="数值", data=df, inner="box")  # inner参数可以是box, quartiles, point, stick, None

# 或者添加散点图
sns.violinplot(x="类别", y="数值", data=df, inner=None)
sns.stripplot(x="类别", y="数值", data=df, color="black", size=3, jitter=True)

# 添加标题
plt.title("小提琴图", fontsize=16)

# 保存图形
plt.savefig("seaborn_violinplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 5. 热力图
# 生成相关系数矩阵
np.random.seed(42)
data = np.random.rand(10, 10)
cov_matrix = np.cov(data)

# 创建图形
plt.figure(figsize=(10, 8))

# 绘制热力图
sns.heatmap(cov_matrix, annot=True, fmt=".2f", cmap="viridis", square=True, linewidths=0.5)

# 添加标题
plt.title("热力图（相关系数矩阵）", fontsize=16)

# 保存图形
plt.savefig("seaborn_heatmap.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 6. 柱状图
# 生成数据
np.random.seed(42)
categories = ["A", "B", "C", "D"]
values = [3, 7, 2, 5]

# 创建DataFrame
df = pd.DataFrame({"类别": categories, "数值": values})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制柱状图
sns.barplot(x="类别", y="数值", data=df)

# 添加标题
plt.title("柱状图", fontsize=16)

# 保存图形
plt.savefig("seaborn_barplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 7. 计数图
# 生成数据
np.random.seed(42)
categories = ["A", "B", "C", "D", "A", "B", "C", "A", "B", "D"]

# 创建DataFrame
df = pd.DataFrame({"类别": categories})

# 创建图形
plt.figure(figsize=(10, 6))

# 绘制计数图
sns.countplot(x="类别", data=df)

# 添加标题
plt.title("计数图", fontsize=16)

# 保存图形
plt.savefig("seaborn_countplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 8. 配对图
# 生成随机数据
np.random.seed(42)
data = np.random.randn(100, 4)
df = pd.DataFrame(data, columns=["变量1", "变量2", "变量3", "变量4"])

# 创建图形
pair_plot = sns.pairplot(df, diag_kind="kde", markers=".", plot_kws={"alpha": 0.7})

# 添加标题
pair_plot.fig.suptitle("配对图", y=1.02, fontsize=16)

# 保存图形
plt.savefig("seaborn_pairplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 9. 分面网格图
# 生成数据
np.random.seed(42)
x = np.linspace(0, 10, 100)
y = np.sin(x)
category = ["A"] * 50 + ["B"] * 50

# 创建DataFrame
df = pd.DataFrame({"x": x, "y": y, "类别": category})

# 创建分面网格图
grid = sns.FacetGrid(df, col="类别", height=5)
grid.map(plt.plot, "x", "y", color="blue")

grid.set_titles("类别 {col_name}")
grid.set_xlabels("x")
grid.set_ylabels("y")

# 添加总标题
plt.suptitle("分面网格图", y=1.02, fontsize=16)
plt.tight_layout()

# 保存图形
plt.savefig("seaborn_facetgrid.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

# 10. 联合分布图
# 生成随机数据
np.random.seed(42)
x = np.random.randn(1000)
y = x + np.random.randn(1000) * 0.5

# 创建DataFrame
df = pd.DataFrame({"x": x, "y": y})

# 创建图形
plt.figure(figsize=(10, 8))

# 绘制联合分布图
joint_plot = sns.jointplot(x="x", y="y", data=df, kind="reg", height=8)

# 添加标题
joint_plot.fig.suptitle("联合分布图", y=1.02, fontsize=16)

# 保存图形
plt.savefig("seaborn_jointplot.png", dpi=300, bbox_inches="tight")

# 显示图形
plt.show()

### 24.3.3 plotly库

plotly是一个交互式数据可视化库，它可以创建各种类型的交互式图表，如折线图、散点图、柱状图、饼图、热力图等。plotly的图表可以嵌入到网页中，并且支持缩放、平移、悬停显示详细信息等交互功能。

安装plotly：

```bash
pip install plotly
```

一个简单的plotly程序示例：

```python
import plotly.graph_objects as go
import plotly.express as px
import numpy as np
import pandas as pd

# 设置中文显示
# plotly通常会自动处理中文字符，但在某些情况下可能需要指定字体
# 可以通过config参数设置

# 1. 折线图
# 生成数据
np.random.seed(42)
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 创建图表
fig = go.Figure()

# 添加折线
fig.add_trace(go.Scatter(x=x, y=y1, mode="lines+markers", name="sin(x)", 
                         line=dict(color="blue", width=2), 
                         marker=dict(size=5, symbol="circle")))
fig.add_trace(go.Scatter(x=x, y=y2, mode="lines+markers", name="cos(x)", 
                         line=dict(color="red", width=2), 
                         marker=dict(size=5, symbol="square")))

# 更新布局
fig.update_layout(title="正弦和余弦函数", 
                  xaxis_title="x", 
                  yaxis_title="y", 
                  legend_title="函数", 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 更新坐标轴
fig.update_xaxes(range=[0, 10], dtick=1)
fig.update_yaxes(range=[-1.2, 1.2])

# 保存图表（HTML格式）
fig.write_html("plotly_line_chart.html")

# 保存图表（静态图像）
# 需要安装kaleido: pip install kaleido
# fig.write_image("plotly_line_chart.png")

# 显示图表
fig.show()

# 2. 散点图
# 生成随机数据
np.random.seed(42)
n = 100
x = np.random.randn(n)
y = np.random.randn(n)
colors = np.random.randn(n)
sizes = 20 * np.random.rand(n) + 5

# 创建DataFrame
df = pd.DataFrame({"x": x, "y": y, "colors": colors, "sizes": sizes})

# 使用plotly.express创建散点图
fig = px.scatter(df, x="x", y="y", color="colors", size="sizes", 
                 title="散点图示例", 
                 labels={"x": "X轴", "y": "Y轴", "colors": "颜色值"}, 
                 opacity=0.7, 
                 color_continuous_scale="Viridis")

# 更新布局
fig.update_layout(width=800, height=600, template="plotly_white")

# 保存图表
fig.write_html("plotly_scatter_plot.html")

# 显示图表
fig.show()

# 3. 柱状图
# 生成数据
categories = ["A", "B", "C", "D", "E"]
values1 = [3, 7, 2, 5, 8]
values2 = [4, 2, 6, 3, 5]

# 创建图表
fig = go.Figure()

# 添加柱状图
fig.add_trace(go.Bar(x=categories, y=values1, name="数据1", marker_color="blue"))
fig.add_trace(go.Bar(x=categories, y=values2, name="数据2", marker_color="red"))

# 更新布局
fig.update_layout(title="柱状图示例", 
                  xaxis_title="类别", 
                  yaxis_title="数值", 
                  legend_title="数据来源", 
                  barmode="group",  # 可以是"group"（分组）或"stack"（堆叠）
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_bar_chart.html")

# 显示图表
fig.show()

# 4. 直方图
# 生成随机数据
np.random.seed(42)
data = np.random.normal(0, 1, 1000)

# 使用plotly.express创建直方图
fig = px.histogram(data, nbins=30, title="直方图示例（正态分布数据）", 
                   labels={"value": "数值"}, 
                   color_discrete_sequence=["blue"], 
                   opacity=0.7)

# 更新布局
fig.update_layout(xaxis_title="数值", 
                  yaxis_title="频率", 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_histogram.html")

# 显示图表
fig.show()

# 5. 饼图
# 生成数据
labels = ["类别A", "类别B", "类别C", "类别D"]
values = [30, 25, 20, 25]
colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"]

# 创建图表
fig = go.Figure(data=[go.Pie(labels=labels, values=values, hole=0.3,  # hole参数创建环形图
                            marker=dict(colors=colors, line=dict(color="black", width=1)),
                            textinfo="label+percent",  # 显示标签和百分比
                            insidetextorientation="radial")])  # 文本方向

# 更新布局
fig.update_layout(title="饼图示例", 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_pie_chart.html")

# 显示图表
fig.show()

# 6. 箱线图
# 生成随机数据
np.random.seed(42)
data1 = np.random.normal(0, 1, 100)
data2 = np.random.normal(2, 1, 100)
data3 = np.random.normal(-2, 1.5, 100)

df = pd.DataFrame({"数据集1": data1, "数据集2": data2, "数据集3": data3})

# 使用plotly.express创建箱线图
fig = px.box(df, title="箱线图示例", 
             labels={"value": "数值", "variable": "数据集"}, 
             color_discrete_sequence=["blue"])

# 更新布局
fig.update_layout(yaxis_title="数值", 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_boxplot.html")

# 显示图表
fig.show()

# 7. 热力图
# 生成随机数据
np.random.seed(42)
data = np.random.rand(10, 10)
x_labels = [f"X{i}" for i in range(10)]
y_labels = [f"Y{i}" for i in range(10)]

# 创建图表
fig = go.Figure(data=go.Heatmap(z=data, x=x_labels, y=y_labels, colorscale="Viridis"))

# 更新布局
fig.update_layout(title="热力图示例", 
                  xaxis_title="X轴", 
                  yaxis_title="Y轴", 
                  template="plotly_white", 
                  width=800, 
                  height=800)

# 保存图表
fig.write_html("plotly_heatmap.html")

# 显示图表
fig.show()

# 8. 3D散点图
# 生成随机数据
np.random.seed(42)
n = 100
x = np.random.randn(n)
y = np.random.randn(n)
z = np.random.randn(n)
colors = np.random.randn(n)
sizes = 20 * np.random.rand(n) + 5

# 创建图表
fig = go.Figure(data=go.Scatter3d(x=x, y=y, z=z, mode="markers", 
                                 marker=dict(size=sizes, color=colors, colorscale="Viridis", 
                                             opacity=0.7, colorbar=dict(title="颜色值"))))

# 更新布局
fig.update_layout(title="3D散点图示例", 
                  scene=dict(xaxis_title="X轴", yaxis_title="Y轴", zaxis_title="Z轴"), 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_3d_scatter.html")

# 显示图表
fig.show()

# 9. 3D曲面图
# 生成数据
np.random.seed(42)
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
x, y = np.meshgrid(x, y)
z = np.sin(np.sqrt(x**2 + y**2))

# 创建图表
fig = go.Figure(data=go.Surface(z=z, x=x, y=y, colorscale="Viridis"))

# 更新布局
fig.update_layout(title="3D曲面图示例", 
                  scene=dict(xaxis_title="X轴", yaxis_title="Y轴", zaxis_title="Z轴"), 
                  template="plotly_white", 
                  width=800, 
                  height=600)

# 保存图表
fig.write_html("plotly_surface.html")

# 显示图表
fig.show()

# 10. 气泡图
# 生成随机数据
np.random.seed(42)
n = 50
country = [f"国家{i}" for i in range(n)]
population = np.random.randint(10, 1000, n)
gdp = np.random.randint(100, 10000, n)
life_expectancy = np.random.uniform(50, 90, n)

# 创建DataFrame
df = pd.DataFrame({"国家": country, "人口（百万）": population, 
                  "GDP（十亿美元）": gdp, "预期寿命（岁）": life_expectancy})

# 使用plotly.express创建气泡图
fig = px.scatter(df, x="GDP（十亿美元）", y="预期寿命（岁）", size="人口（百万）", 
                 hover_name="国家", title="气泡图示例", 
                 size_max=60, opacity=0.7, 
                 color_discrete_sequence=["blue"])

# 更新布局
fig.update_layout(template="plotly_white", width=800, height=600)

# 保存图表
fig.write_html("plotly_bubble_chart.html")

# 显示图表
fig.show()

## 24.4 其他图形和多媒体库

除了上面介绍的库之外，Python还有许多其他的图形和多媒体库，下面我们将简要介绍其中的一些。

### 24.4.1 3D图形库

#### 24.4.1.1 Mayavi

Mayavi是一个用于科学数据可视化的Python库，它提供了丰富的3D可视化功能，可以创建各种类型的3D图表，如曲面图、体积渲染、向量场可视化等。

安装Mayavi：

```bash
pip install mayavi
```

#### 24.4.1.2 PyVista

PyVista是一个用于3D可视化和分析的Python库，它基于VTK（Visualization Toolkit），提供了更加用户友好的API。

安装PyVista：

```bash
pip install pyvista
```

### 24.4.2 科学可视化库

#### 24.4.2.1 VisPy

VisPy是一个用于科学可视化的Python库，它使用OpenGL进行渲染，可以处理大规模数据的可视化。

安装VisPy：

```bash
pip install vispy
```

#### 24.4.2.2 Bokeh

Bokeh是一个用于创建交互式Web可视化的Python库，它可以创建各种类型的交互式图表，并支持数据流和大规模数据集的可视化。

安装Bokeh：

```bash
pip install bokeh
```

### 24.4.3 游戏开发库

#### 24.4.3.1 Pygame

Pygame是一个用于游戏开发的Python库，它提供了图形、声音、输入等游戏开发所需的功能。

安装Pygame：

```bash
pip install pygame
```

#### 24.4.3.2 Pyglet

Pyglet是一个用于游戏开发和多媒体应用的Python库，它支持OpenGL图形、窗口管理、用户输入、音频等功能。

安装Pyglet：

```bash
pip install pyglet
```

### 24.4.4 计算机视觉库

#### 24.4.4.1 dlib

dlib是一个用于机器学习和计算机视觉的C++库，它提供了Python绑定，包含了许多人脸检测、人脸识别、姿态估计等算法。

安装dlib：

```bash
pip install dlib
```

#### 24.4.4.2 face_recognition

face_recognition是一个基于dlib的人脸识别库，它提供了简单的API，可以进行人脸检测、人脸识别等操作。

安装face_recognition：

```bash
pip install face_recognition
```

## 24.5 编程小贴士

1. 在处理图像时，注意图像的模式（RGB、RGBA、L等），不同的模式可能需要不同的处理方法。

2. 在使用Pillow库时，如果遇到中文显示问题，可以尝试指定中文字体。

3. 在处理音频和视频文件时，注意文件格式和编解码器的兼容性，可能需要安装额外的编解码器。

4. 在进行数据可视化时，选择合适的图表类型非常重要，应根据数据的特点和要表达的信息选择合适的图表。

5. 在使用matplotlib进行中文显示时，可以通过设置`plt.rcParams["font.family"]`来指定中文字体。

6. 在使用plotly创建交互式图表时，可以保存为HTML文件，以便在网页中嵌入或分享。

7. 在处理大型图像或视频文件时，注意内存的使用，避免一次性加载整个文件到内存中。

8. 在进行图像处理时，可以使用numpy数组进行高效的数值运算。

9. 在使用OpenCV时，注意它默认使用BGR格式，而其他库（如matplotlib）通常使用RGB格式，需要进行格式转换。

10. 在选择图形和多媒体库时，考虑项目的需求、性能要求、开发效率等因素，选择最适合的库。

## 24.6 动手练习

### 24.6.1 图像编辑器

创建一个简单的图像编辑器，实现以下功能：

1. 读取和保存常见格式的图像文件
2. 调整图像大小和裁剪图像
3. 旋转和翻转图像
4. 调整亮度、对比度和饱和度
5. 应用滤镜（如灰度、模糊、锐化、边缘检测等）
6. 在图像上绘制简单的图形（如线条、矩形、圆形、文本等）

**提示**：可以使用Pillow库来实现这些功能。

### 24.6.2 音频播放器

创建一个简单的音频播放器，实现以下功能：

1. 播放常见格式的音频文件
2. 暂停和继续播放
3. 调整音量
4. 快进和快退
5. 显示音频波形

**提示**：可以使用PyDub、pyaudio和matplotlib库来实现这些功能。

### 24.6.3 数据可视化仪表盘

创建一个简单的数据可视化仪表盘，实现以下功能：

1. 读取CSV或Excel格式的数据文件
2. 创建多种类型的图表（如折线图、散点图、柱状图、饼图等）
3. 支持图表的交互操作（如缩放、平移、悬停显示详情等）
4. 支持数据筛选和排序
5. 可以导出图表为图片或PDF格式

**提示**：可以使用pandas、plotly或seaborn库来实现这些功能。

## 24.7 挑战任务

### 24.7.1 人脸识别应用

开发一个人脸识别应用，实现以下功能：

1. 从摄像头捕获视频流
2. 实时检测人脸
3. 识别人脸（如果是已知人脸，显示姓名）
4. 记录人脸识别日志
5. 保存识别到的人脸图像

**提示**：可以使用OpenCV和face_recognition库来实现这些功能。

### 24.7.2 视频特效应用

开发一个视频特效应用，实现以下功能：

1. 读取视频文件
2. 实时应用各种视频特效（如灰度、模糊、边缘检测、色调调整等）
3. 添加文字或图像水印
4. 添加背景音乐或音效
5. 保存处理后的视频

**提示**：可以使用MoviePy库来实现这些功能。

### 24.7.3 交互式数据可视化Web应用

使用Python的Web框架（如Flask、Django等）和数据可视化库（如plotly、Bokeh等）开发一个交互式数据可视化Web应用，实现以下功能：

1. 上传数据文件（如CSV、Excel等）
2. 自动分析数据并生成初步的可视化结果
3. 提供交互式界面，允许用户选择图表类型、设置图表参数、筛选数据等
4. 支持保存和分享可视化结果
5. 响应式设计，适配不同屏幕尺寸的设备

**提示**：可以使用Flask作为Web框架，plotly或Bokeh来创建交互式图表。

### 24.7.4 实现一个简单的数字艺术生成器

开发一个数字艺术生成器，实现以下功能：

1. 根据用户输入的参数（如颜色、形状、图案等）生成抽象的数字艺术作品
2. 支持多种艺术风格（如分形艺术、流体模拟、粒子系统等）
3. 可以调整各种参数，实时预览效果
4. 保存生成的艺术作品为图像文件

**提示**：可以使用Pillow、numpy和random库来实现基本的生成功能，对于更复杂的效果（如分形），可以使用专门的算法或库。

## 24.8 总结

在本节课中，我们学习了Python中的图形和多媒体处理相关知识，包括：

1. **图形处理基础**：使用Pillow、OpenCV、scikit-image等库进行图像的读取、显示、修改、保存等操作，以及基本的图像绘制和高级图像操作。

2. **多媒体处理**：使用PyDub、librosa、pyaudio等库进行音频的录制、播放、编辑、分析等操作；使用MoviePy、OpenCV等库进行视频的读取、播放、编辑、分析等操作。

3. **数据可视化**：使用matplotlib、seaborn、plotly等库创建各种类型的图表，如折线图、散点图、柱状图、饼图、热力图等，以及交互式数据可视化。

4. **其他图形和多媒体库**：简要介绍了一些其他的图形和多媒体库，如3D图形库、科学可视化库、游戏开发库、计算机视觉库等。

图形和多媒体处理是Python编程中的重要领域，它在图像处理、计算机视觉、音频处理、视频处理、数据可视化、游戏开发等方面有着广泛的应用。通过本节课的学习，你应该能够使用Python进行基本的图形和多媒体处理，并开发一些简单的图形和多媒体应用。

在下一节课中，我们将学习Python的科学计算和数据分析相关知识，包括NumPy、pandas、SciPy等库的使用，以及数据清洗、分析、可视化等技术。