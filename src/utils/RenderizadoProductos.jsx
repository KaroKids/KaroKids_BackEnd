import React from 'react'

const RenderizadoProductos = (productos_compra, moneda) => {
  return (
    <table align="center" border="0" cellpadding="0" style="background-color:#cde6eea0; border:0px solid #ffffffd0; border-radius:5px; font-family:arial,sans-serif; max-width:700px; width:100%">
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