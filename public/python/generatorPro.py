import qrcode
from PIL import Image
import sys
# taking image which user wants
# in the QR code 
try:
  text = sys.argv[1]
  color = sys.argv[2]
  Logo_link = sys.argv[3]
  f=open('./public/python/log.txt','r')
  qrNo = f.read()
    
  qrNo = int(qrNo) + 1
  f.close()
  f=open('./public/python/log.txt','w')
  f.write(str(qrNo))
  f.close()
   
  logo = Image.open(Logo_link)
   
  # taking base width
  basewidth = 100
   
  # adjust image size
  wpercent = (basewidth/float(logo.size[0]))
  hsize = int((float(logo.size[1])*float(wpercent)))
  logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
  QRcode = qrcode.QRCode(
      error_correction=qrcode.constants.ERROR_CORRECT_H
  )
   
  # taking url or text
  url = text
   
  # adding URL or text to QRcode
  QRcode.add_data(url)
   
  # generating QR code
  QRcode.make()
   
  # taking color name from user
  QRcolor = color
   
  # adding color to QR code
  QRimg = QRcode.make_image(
      fill_color=QRcolor, back_color="white").convert('RGB')
   
  # set size of QR code
  pos = ((QRimg.size[0] - logo.size[0]) // 2,
         (QRimg.size[1] - logo.size[1]) // 2)
  QRimg.paste(logo, pos)
   
  # save the QR code generated
  path='Qr-Code-'+str(qrNo)+'-m.Pmf'+ '.png'
  QRimg.save(path)
   
except Exception as e:
  print(str(e))
  sys.stdout.flush()
print(path)
sys.stdout.flush()