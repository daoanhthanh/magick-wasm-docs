#crop ảnh tròn putin
magick input4.jpg \
  +repage -crop 1024x1024+0+0! \
  -auto-orient -alpha on \
  \( +clone -channel a -evaluate \
  multiply 0 +channel -fill white \
  -draw 'circle 512.0, 512.0 0.0, 512.0' \) \
  -compose DstIn -composite -resize 506 output4.png

#crop ảnh bán nguyệt trái elonmusk
magick input2.jpg \
  -background transparent \
  +repage -crop 670x670+264-135! \
  -flatten -define modulate:colorspace=HSB \
  -auto-orient -alpha on \
  \( +clone -channel a -evaluate multiply 0 +channel -fill white -draw 'translate 335,335 rotate 180 path "M 0,0 L 0,-335 A 335,335 0 0,1  0,335 Z"' \) \
  -compose DstIn -composite -resize 526x526! \
  output2.png

#crop ảnh bán nguyệt phải mèo ngón giữa
magick input3.jpeg \
  -background transparent \
  +repage -crop 1412x1411-378+2! \
  -flatten -define modulate:colorspace=HSB \
  -auto-orient -alpha on \
  \( +clone -channel a -evaluate multiply 0 +channel -fill white -draw 'translate 706,705 rotate 0 path "M 0,1 L 0,-705 A 706,706 0 0,1  0,707 Z"' \) \
  -compose DstIn -composite -resize 526x526! \
  output3.png

#crop ảnh hình thoi con chó bị ong đốt
magick input1.jpeg \
  -background transparent \
  -rotate -120 \
  +repage -crop 830x830+164+121! \
  -flatten -define modulate:colorspace=HSB \
  -auto-orient -alpha on \
  \( +clone -channel a -evaluate multiply 0 +channel -fill white \
  -draw 'translate 415, 415 rotate 47 rectangle -289, -295, 289, 295' \) \
  -compose DstIn -composite -resize 815x815! \
  output1.png

# combine ảnh
convert template.png \
  \( crop_ea1ed219-aab8-4d70-93e5-32072e6a0061.png -resize 875x875 \) \
  -geometry +80+79 -compose DstOver -composite \
  \( crop_1704770188554175bb88b-5d21-4242-aca3-3751d087bbaf.png -resize 446x446 \) \
  -geometry +885+735 -compose DstOver -composite \
  \( crop_49ad182e-edca-4692-8dcb-a3315eb17048.png -resize 448x448 \) \
  -geometry +1771+80 -compose DstOver -composite \
  \( crop_e4449b68-32c1-43c2-a767-ee12f833b534.png -resize 874x874 \) \
  -geometry +2150+305 -compose DstOver -composite \
  \( crop_d6c35327-6225-4d80-ba70-40775e6f48f0.png -resize 647x647 \) \
  -geometry +1412+525 -compose DstOver -composite \
  \( crop_d8760156-e012-41da-97a2-0781976c2a1a.png -resize 651x651 \) \
  -geometry +1039+82 -compose DstOver -composite \
  \( template.png -resize 3102x1260! \) \
  -compose DstOver -composite 1704770193853finish.png
