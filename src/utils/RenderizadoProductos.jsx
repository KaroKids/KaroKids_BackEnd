import React from 'react'

const RenderizadoProductos = (productos_compra, moneda) => {
  return (
    <table border="0" cellspacing="5px" style="color:#4d4d4d; font-size:13px" width="100%">
        <tbody>
            {productos_compra && productos_compra.map((producto, index) => {
                    <tr key={index}>
                        <td align="left">{producto.nombre}</td>
                        <td align="center">{`${producto.compra_talla} - ${producto.compra_color} - ${producto.compra_cantidad}`}</td>
                        <td align="right">{`${moneda} ${producto.precio}`}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
  )
}

export default RenderizadoProductos