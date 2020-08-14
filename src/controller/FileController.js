const path = require('path');
const csv = require('csvtojson');
const excelToJson = require('convert-excel-to-json');

const { PythonShell } = require('python-shell');

class FileController {
  async store(req, res) {
    try {
      const { path: pathFile, originalname } = req.file;

    let newJson = [];

    if(originalname.includes('.xls')){

      const result = excelToJson({
          sourceFile: pathFile
      });

      newJson = result.Report.map(item => {
        if(typeof item.A === 'number' && (typeof item.B === 'number' || typeof item.C === 'number' || typeof item.D === 'number' || typeof item.E === 'number') ){
          let secondLine = item.B || item.C || item.D || item.E;
          return {
            Wavenumber:parseFloat(item.A),
            Intensity:parseFloat(secondLine)
          }
        }
      }).filter(item => item)
      
    } else {
      const jsonArray = await csv().fromFile(pathFile);
    
      newJson = jsonArray.map(item => ({
        Wavenumber:  parseFloat(item.Wavenumber),
        Intensity: parseFloat(item.Intensity)
      }));
    }

    const options = {
      scriptPath: path.resolve(__dirname, '..', '..','python'),
    };

    var pyshell = new PythonShell('script.py', options);

    pyshell.send(JSON.stringify(newJson));

     pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        let retorno = 'Invalid';
        if(message == 'Positivo'){
          retorno = 'Positive';
        }
        if(message == 'Negativo'){
           retorno = 'Negative';
        }

         return res.status(200).json({ retorno });
         //return res.status(200).json({ message });   
    });
    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished');
    });
    
    } catch (error) {
      console.log(error.stack)
    }
  }
}
module.exports = new FileController();