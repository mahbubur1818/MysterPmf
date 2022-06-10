function spaw(spawn){
  input='hi';
  console.log("got spawn, which is");
  console.log(spawn);
  let argv= input.value;
  const pythonProcess = spawn('python',["python/generator.py", argv]);
  pythonProcess.stdout.on('data', (data) => {
    return data;
});
}
module.exports = spaw