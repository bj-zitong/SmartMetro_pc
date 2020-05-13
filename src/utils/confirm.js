import { MessageBox } from 'element-ui'
export function handleCofirm(text = '确定执行此操作吗？') {
    return MessageBox.confirm(text, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        showClose:false
    })
}
