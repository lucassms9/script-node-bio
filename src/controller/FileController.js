const path = require('path');
const csv = require('csvtojson');

const { PythonShell } = require('python-shell');

class FileController {
  async store(req, res) {
    const { path: pathFile } = req.file;

    const jsonArray = await csv().fromFile(pathFile);
    
    const newJson = jsonArray.map(item => ({
      Wavenumber:  parseFloat(item.Wavenumber),
      Intensity: parseFloat(item.Intensity)
    }));

    const options = {
      scriptPath: path.resolve(__dirname, '..', '..','python'),
    };

    var pyshell = new PythonShell('script.py', options);

    pyshell.send(JSON.stringify(newJson));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
       return res.status(200).json({ message: message });
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished');
    });

    // const jsonArray = await csv().fromFile(pathFile);
    // const options = {
    //   scriptPath: path.resolve(__dirname, '..', '..','python'),
    //   args: [JSON.stringify([1,2,3,4,5])]
    // };

    // PythonShell.run('script.py', options, function (err, results) {
    //   if (err) throw err;
    //   return res.status(200).json({ message: results });
    // });
    
  }
}
module.exports = new FileController();

