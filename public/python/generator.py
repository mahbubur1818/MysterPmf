import sys
import qrcode
from PIL import Image

try:
  text = sys.argv[1]
  color = sys.argv[2]
  f=open('./public/python/log.txt','r')
  qrNo = f.read()

  qrNo = int(qrNo) + 1
  f.close()
  f=open('./public/python/log.txt','w')
  f.write(str(qrNo))
  f.close()
  
  QRcode = qrcode.QRCode(
      error_correction=qrcode.constants.ERROR_CORRECT_H
  )
  QRcode.add_data(url)
   
  # generating QR code
  QRcode.make()
  QRimg = QRcode.make_image(
      fill_color=color, back_color="white").convert('RGB')
  path='qrCode/Qr-Code-'+str(qrNo)+'-m.Pmf'+ '.png'
  QRimg.save('./public/python/'+ path)

except Exception as e:
  print(str(e))
  sys.stdout.flush()
print(path)
sys.stdout.flush()