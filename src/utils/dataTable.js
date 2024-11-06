
export const template = (options, dom) => `<div class='${options.classes.top} mb-3'>

<div class='w-100'>

<div class='d-flex justify-content-between w-100'>
${options.searchable ?
        `<div class='${options.classes.search}'>
<input class='${options.classes.input}' placeholder='Search' type='search' title='${options.labels.searchTitle}'${dom.id ? ` aria-controls="${dom.id}"` : ""}>
</div>` :
        ""
    }

    ${options.paging && options.perPageSelect ?
        `<div class='${options.classes.dropdown}'>
            <label>
                <select class='${options.classes.selector}'></select>
            </label>
        </div>` :
        ""
    }

</div>

</div>
   
    
</div>
<div class='${options.classes.container} table-responsive '${options.scrollY.length ? ` style='height: ${options.scrollY}; overflow-Y: auto;'` : ""}></div>
<div class='${options.classes.bottom}'>
    ${options.paging ?
        `<div class='${options.classes.info}'></div>` :
        ""
    }
    <nav class='${options.classes.pagination}'></nav>
</div>`

