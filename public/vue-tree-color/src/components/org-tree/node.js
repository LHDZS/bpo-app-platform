
// 判断是否叶子节点
const isLeaf = (data, prop) => {
  return !(Array.isArray(data[prop]) && data[prop].length > 0)
}
console.info('Thank you for using vue-tree-color \nIf you have any questions about this plug-in, please contact me in the following ways \nWeChat: yanjiahui12345 \nWeChat official number: Web_Miao')
// 创建 node 节点
export const renderNode = (h, data, context) => {
  const { props } = context
  const cls = ['org-tree-node']
  const childNodes = []
  const children = data[props.props.children]

  if (isLeaf(data, props.props.children)) {
    cls.push('is-leaf')
  } else if (props.collapsable && !data[props.props.expand]) {
    cls.push('collapsed')
  }

  childNodes.push(renderLabel(h, data, context))

  if (!props.collapsable || data[props.props.expand]) {
    childNodes.push(renderChildren(h, children, context))
  }

  return h('div', {
    domProps: {
      className: cls.join(' ')
    }
  }, childNodes)
}

// 创建展开折叠按钮
export const renderBtn = (h, data, { props, listeners }) => {
  const expandHandler = listeners['on-expand']

  let cls = ['org-tree-node-btn']

  if (data[props.props.expand]) {
    cls.push('expanded')
  }

  return h('span', {
    domProps: {
      className: cls.join(' ')
    },
    on: {
      click: e => expandHandler && expandHandler(e,data)
    }
  })
}

// 创建 label 节点
export const renderLabel = (h, data, context) => {
  const { props, listeners } = context
  const label = data[props.props.label]
  const name = data[props.props.name] || 'xxxx'
  const target = data[props.props.target] || 'xx'
  const value = data[props.props.value] || '40%'
  const renderContent = props.renderContent

  // event handlers
  const clickHandler = listeners['on-node-click']
  const mouseOverHandler = listeners['on-node-mouseover']
  const mouseOutHandler = listeners['on-node-mouseout']

  const childNodes = []
  if (typeof renderContent === 'function') {
    let vnode = renderContent(h, data)

    vnode && childNodes.push(vnode)
  } else {
    // 姓名
    childNodes.push(h('span',{
			domProps: {
			  title: name
			},
      style: { maxWidth: '120px',overflow:'hidden',backgroundColor: '#fff', color: '#4295D5', fontSize: '12px',float: 'left',
        padding: '1px 15px',
        borderRadius: '10px',
        wordBreak:'keep-all',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis' 
      },
    },name))
    // 目标
    childNodes.push(h('span',{
			domProps: {
			  title: target
			},
      style: { maxWidth: '120px',overflow:'hidden',backgroundColor: '#fff', color: '#4295D5',fontSize: '12px',float: 'right',
        padding: '1px 15px',
        borderRadius: '10px',
        wordBreak:'keep-all',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis' 
      },
    },target))
    // 占位换行
    childNodes.push(h('div',{
			domProps: {
			  title: ''
			},
			style: { width: '100%',height: '13px', overflow:'hidden'},
    },''))
    // 任务名
    childNodes.push(h('span',{
			domProps: {
			  title: label
			},
			style: { width: '200px',overflow:'hidden',display: 'inline-block',textAlign: 'left',
 
           wordBreak:'keep-all',
 
           whiteSpace:'nowrap',
 
           textOverflow:'ellipsis' },
    },label))
    // 任务指标
    childNodes.push(h('span',{
			domProps: {
			  title: value
			},
			style: { width: '40px',overflow:'hidden',display: 'inline-block',textAlign: 'right'},
    },value))
    // childNodes.push(label)
  }

  if (props.collapsable && !isLeaf(data, props.props.children)) {
    childNodes.push(renderBtn(h, data, context))
  }

  const cls = ['org-tree-node-label-inner']
  let { labelWidth, labelClassName, selectedClassName, selectedKey ,judge,NodeClass} = props

  if (typeof labelWidth === 'number') {
    labelWidth += 'px'
  }

  if (typeof labelClassName === 'function') {
    labelClassName = labelClassName(data)
  }

  labelClassName && cls.push(labelClassName)

  // add selected class and key from props
  if (typeof selectedClassName === 'function') {
    selectedClassName = selectedClassName(data)
  }

  selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName)

  return h('div', {
    domProps: {
      className: 'org-tree-node-label'
    }
  }, [h('div', {
    domProps: {
      className:ChangeTheColor(data,judge,NodeClass) + " org-tree-node-label-inner"
    },
    style: { width: labelWidth },
    on: {
      'click': e => clickHandler && clickHandler(e, data),
      'mouseover': e => mouseOverHandler && mouseOverHandler(e, data),
      'mouseout': e => mouseOutHandler && mouseOutHandler(e, data)
    }
  }, childNodes)])
}

function ChangeTheColor(e,judge,NodeClass){
  if(judge!==""&&judge!==undefined&&judge!==null&&judge.swtich!==false){
    for(var k in judge) {
      var a = (eval("e."+k))
      if(NodeClass){
        for(let c =0 ;c<NodeClass.length;c++){
          if( a === NodeClass[c])
            return  NodeClass[c]
          else if(NodeClass.length-1==c)
            return ""
        }
      }else{
        return ""
      }
    }
  }else{
    return ""
  }
}
// 创建 node 子节点
export const renderChildren = (h, list, context) => {
  if (Array.isArray(list) && list.length) {
    const children = list.map(item => {
      return renderNode(h, item, context)
    })

    return h('div', {
      domProps: {
        className: 'org-tree-node-children'
      }
    }, children)
  }
  return ''
}

export const render = (h, context) => {
  const {props} = context

  return renderNode(h, props.data, context)
}

export default render