const xlsx = require('xlsx');
const fs = require('fs');

try {
  const workbook = xlsx.readFile('C:\\Users\\aaron\\OneDrive\\Documentos\\ANTIGRAVITY PROYECTOS\\MATERIAL CLUB TENIS\\TOTAL DE SOCIOS edit.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convert sheet to JSON array (array of arrays to easily access by column index)
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  const socios = [];
  
  // Skip header row (assuming row 0 is header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;
    
    // Column A = index 0 (Código del socio)
    // Column B = index 1 (Primer Apellido)
    // Column D = index 3 (Primer nombre)
    // Column F = index 5 (Numero de dni)
    
    const codigo = row[0] ? String(row[0]).trim() : '';
    const apellido = row[1] ? String(row[1]).trim() : '';
    const nombre = row[3] ? String(row[3]).trim() : '';
    const dni = row[5] ? String(row[5]).trim() : '';
    
    if (codigo && dni) {
      socios.push({ codigo, apellido, nombre, dni });
    }
  }
  
  fs.writeFileSync('C:\\Users\\aaron\\OneDrive\\Documentos\\ANTIGRAVITY PROYECTOS\\tennis-reservations\\src\\data\\socios.json', JSON.stringify(socios, null, 2));
  console.log(`Parsed ${socios.length} socios successfully.`);
} catch (error) {
  console.error("Error parsing Excel:", error);
}
