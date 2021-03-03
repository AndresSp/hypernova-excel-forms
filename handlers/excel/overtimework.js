const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const moment = require('moment');


const overTimeWork = async (req, h) => {
    let { fullname, role, dept, month, company, overtimework } = req.payload

    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const monthText = new Date(month).toLocaleDateString('es-ES', { month: 'long' })
    const yearNumber = new Date(month).toLocaleDateString('es-ES', { year: 'numeric' })

    const monthDate = new Date(month)

    const startMonthText = moment(monthDate).startOf('month').toDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const endMonthText = moment(monthDate).endOf('month').toDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const docName = `Formulario de Horas Extras - ${fullname} ${monthText} ${yearNumber}.xlsx`
    const inputPath = path.join(__dirname, `./../../public/templates/Formulario de  Horas Extras - Hypernova Labs - template.xlsx`)
    const outputPath = path.join(__dirname, `./../../temp/overTimeWork.xlsx`)
    const tempDir = path.join(__dirname, `./../../temp/`)
            

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(inputPath);

    const sheet = workbook.worksheets[0]

    commonWhiteSpace(sheet, 'C11', 'FECHA:', today)
    commonWhiteSpace(sheet, 'H11', 'PERÍODO:', `${startMonthText} a ${endMonthText}`)
    commonWhiteSpace(sheet, 'E12', 'NOMBRE Y APELLIDOS:', fullname)
    commonWhiteSpace(sheet, 'C13', 'CARGO:', role)
    commonWhiteSpace(sheet, 'D14', 'DEPARTAMENTO:', dept)

    overtimework.length = Math.min(overtimework.length, 20) //truncate


    rows = overtimework.map(({
        overtimeDate, 
        workdayStart, 
        workdayEnd,
        overtimeStartTime,
        overtimeEndTime,
        details
        }, i) => {
            sheet.getCell(`C${19+i}`).value = moment(new Date(overtimeDate)).utcOffset(0, true).toDate()
            sheet.getCell(`D${19+i}`).value = moment(new Date(overtimeDate)).utcOffset(0, true).toDate().toLocaleDateString('es-ES', {weekday: 'long'})
            sheet.getCell(`E${19+i}`).value = moment(new Date(workdayStart)).utcOffset(0, true).toDate()
            sheet.getCell(`F${19+i}`).value = moment(new Date(workdayEnd)).utcOffset(0, true).toDate()
            sheet.getCell(`G${19+i}`).value = moment(new Date(overtimeStartTime)).utcOffset(0, true).toDate()
            sheet.getCell(`H${19+i}`).value = moment(new Date(overtimeEndTime)).utcOffset(0, true).toDate()
            sheet.getCell(`K${19+i}`).value = details
            })

    if(company) {
        const companySign = `Firma del Jefe Inmediato - ${company}:___________________________`
        sheet.getCell(`K43`).value = companySign
        sheet.getCell(`K43`).border = { 
            top: {style:'medium'},
            left: {style:'medium'},
            bottom: {style:'medium'},
            right: {style:'medium'}
        }
    }


    // workbook.creator = fullname;
    // workbook.lastModifiedBy = fullname;
    // workbook.created = new Date();
    // workbook.modified = new Date();
    // const sheet = workbook.addWorksheet('Hoja 1');

    // sheet.mergeCells('B2:M8');

    // const imageId1 = workbook.addImage({
    //     filename: path.join(__dirname, `./../../public/img/logo-name.png`),
    //     extension: 'png',
    //   });

    // sheet.addImage(imageId1, 'B2')



    await workbook.xlsx.writeFile(outputPath);


    return await h.file(outputPath, {
        filename: docName, 
        mode: 'attachment'
    });
}

const commonWhiteSpace = (sheet, cell, title, value) => {
    sheet.getCell(cell).value = {
        richText: [
            // {
            //     text: `${title} `,
            //     font: {
            //         size: 20,
            //         bold: true
            //     }
            // }, 
            {
                text: value,
                font: {
                    size: 20,
                    bold: true
                }
            }
        ]
    }
}

const deleteDirFiles = (directory) => {
    return  new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) return reject(err);
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) return reject(err);
                });
            }
            return resolve()
        });
    }) 
}



module.exports = {
    overTimeWork
  }