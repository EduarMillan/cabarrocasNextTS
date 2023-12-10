"use client"
import React, { useState } from "react";
import { TextField, MenuItem, Select, Button } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// type Material = {
// 	id: number;
// 	nombre: string;
// 	descripcion: string;
// 	espesor: string;
// 	longitud_ancho: number;
// 	longitud_largo: number;
// 	calidad_material: string;
// 	costo_total: number;
// 	color: string;
// 	cantidad: number;
// };
function FormMateriales() {

  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const colorOptions = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-amber-500 w-2/5 rounded-md px-10">
        <form className="grid grid-cols-2 gap-4 text-black">
          <TextField
            className="m-3"
            id="outlined-nombre"
            label="Nombre"
            type="text"
          />
          <TextField
            className="m-3"
            type="text"
            id="outlined-descripcion"
            label="Descripción"
            multiline={true}
          />
          <TextField
            className="m-3"
            type="number"
            id="outlined-espesor"
            label="Espesor(mm)"
          />
          <TextField
            className="m-3"
            type="number"
            id="outlined-ancho"
            label="Ancho(m)"
          />
          <TextField
            className="m-3"
            type="number"
            id="outlined-largo"
            label="Largo(m)"
          />
          <TextField
            className="m-3"
            type="number"
            id="outlined-costo"
            label="Costo(CUP)"
          />
          <FormControl>
            <InputLabel id="select-color" className="ml-3 mt-3">
              Color
            </InputLabel>
            <Select
              className="m-3 w-56"
              labelId="select-color"
              label="Color"
              value={selectedColor}
              onChange={handleColorChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {colorOptions.map((color) => (
                <MenuItem
                  key={color}
                  value={color}
                  style={{ backgroundColor: color }}
                >
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="m-3"
            type="number"
            id="outlined-cantidad"
            label="Cantidad"
          />
          <Typography className="m-2">Seleccione calidad del material:</Typography>
          <Stack className="justify-start" direction="row" spacing={1} alignItems="center">
            <Typography>Malo</Typography>
            <Switch  defaultChecked />
            <Typography>Bueno</Typography>
          </Stack>
          
        </form>
        <Button>Guardar</Button>
        <Button>Cancelar</Button>
      </div>
    </div>
  );
}  

export default FormMateriales;