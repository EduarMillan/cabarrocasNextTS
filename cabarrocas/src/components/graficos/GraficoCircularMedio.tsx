"use client";
import React, { useCallback, useEffect, useState } from 'react';
import {
  PieChart, Pie, Sector, Legend,
} from 'recharts';
import { Box, Paper, Typography } from '@mui/material';
import useOrdenes from '@/redux/services/ordenes/ordenesServices';
import { useSelector } from 'react-redux';
import { selectOrdenes } from '@/redux/features/ordenes/ordenesSlice';

interface Orden {
	id: number;
	nombre: string;
	descripcion: string;
	pago_efectivo: number;
	precio: number;
	fecha: Date;
	otros_gastos_descripcion: string;
	costo_otros_gastos: number;
	impuesto_representacion: number;
	impuesto_onat: number;
	impuesto_equipos: number;
	costo_total: number;
	utilidad: number;
	facturado: number;
	entidad: string;
}

const style = {
  top: 270,
  left: 50,
  lineHeight: '24px',
};

const renderActiveShape = (props: any ) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 1}
        y={ey}
        textAnchor={textAnchor}
        fill="#99FF33"
      >
        {` ${value} CUP`}

      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#66FFFF"
      >
        {`( ${(percent * 100).toFixed(2)}% )`}
      </text>
    </g>
  );
};

export default function GraficoCircularMedio() {

    const { getOrdenes } = useOrdenes();
    const ordenesState = useSelector(selectOrdenes);
  const [sumaOficina, setSumaOficina] = useState(0);
  const [sumaEstatales, setSumaEstatales] = useState(0);
  const [sumaOtros, setSumaOtros] = useState(0);

  const data = [
    { name: 'Ofic. Hist.', value: sumaOficina, fill: '#0099FF' },
    { name: 'Emp. Estatales', value: sumaEstatales, fill: '#FF7200' },
    { name: 'Efectivo', value: sumaOtros, fill: '#FFCC02' },
  ];

  const loadingDatos = async () => {

    getOrdenes();

    const contenedor: Array<Orden> = ordenesState.length > 0 ? ordenesState[0].ordenes : [];
     
    const oficiHistoriador = contenedor.filter(
      (x) => x.entidad === 'oficinadelhistoriador',
    );
    const estatales = contenedor.filter(
      (x) => x.entidad === 'entidadesestatales',
    );
    const otros = contenedor.filter((x) => x.entidad === 'otros');

    const sumOficina = oficiHistoriador.reduce(
      (accumulator, item) => accumulator + item.precio,
      0,
    );
    const sumEstatales = estatales.reduce(
      (accumulator, item) => accumulator + item.precio,
      0,
    );
    const sumOtros = otros.reduce(
      (accumulator, item) => accumulator + item.precio,
      0,
    );

    setSumaOficina(sumOficina);
    setSumaEstatales(sumEstatales);
    setSumaOtros(sumOtros);
  };

  useEffect(() => {
    loadingDatos();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5"> TRABAJOS POR ENTIDADES</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PieChart width={430} height={250}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={210}
            cy={130}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
          <Legend
            iconSize={10}
            width={330}
            height={10}
            layout="horizontal"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </PieChart>
      </Box>
    </Paper>
  );
}