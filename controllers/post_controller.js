const { response, request } = require('express');
const { getFormatedDate } = require('../helpers/format-date');
const fs = require('fs');

const postArticulo = async ( req = request, res = response ) => {
    try {
        
        const { titulo, resumen, cuerpo, tags } = req.body

        let tagsTxt = []

        tags.forEach(tag => {
            tagsTxt.push(`'${tag}'`)
        });

        const articulo = `---
title: '${titulo}'
date: '${await getFormatedDate()}'
tags: [${tagsTxt}]
summary: '${resumen}'
authors: ['${req.usuario.nombre}']
---

${cuerpo}`;
        
        fs.writeFileSync( `${process.env.BASE_DIR}/blog/${titulo}.mdx`, articulo );
        return res.status(200).json({
            status: 200,
            msg: 'Archivo creado y guardado con exito'
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}

module.exports = {
    postArticulo
}