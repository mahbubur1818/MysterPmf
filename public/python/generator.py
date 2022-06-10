import sys
import qrcode
import os
try:
  text = sys.argv[1];
  f=open('./public/python/log.txt','r')
  qrNo = f.read()
  
  print('qrno is' + qrNo )
  sys.stdout.flush()
  print(type(qrNo))
  sys.stdout.flush()
  qrNo = int(qrNo) + 1
  f.close()
  f=open('./public/python/log.txt','w')
  f.write(str(qrNo))
  f.close()
  print('before qr')
  sys.stdout.flush()
  qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=5)
  print('after qr')
  sys.stdout.flush()
  
  qr.add_data(text)
  qr.make(fit=True)
  img = qr.make_image(fill='black', back_color='white')
  path='Qr-Code-'+str(qrNo)+'-m.Pmf'+ '.png'
  img.save(path)
  
except Exception as e:
  print(str(e))
  sys.stdout.flush()
print(path)
sys.stdout.flush()