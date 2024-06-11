export interface ListaPaginadaApiResponse<T> {
  numero_pagina: number;
  quantidade_registros: number;
  total_paginas: number;
  total_registros: number;
  items: T[];
}
