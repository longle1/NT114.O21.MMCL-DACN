import React from 'react';
import { Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { drawerAction } from '../redux/actions/DrawerAction';
export default function DrawerHOC() {
    const visible = useSelector(state => state.isOpenDrawer.visible)
    const component = useSelector(state => state.isOpenDrawer.component)
    const submit = useSelector(state => state.isOpenDrawer.submit)
    
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(drawerAction(true))
    }
    const handleOpen = () => {
        dispatch(drawerAction(false))
    }
    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={handleClose}
                open={visible}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={submit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {component}
            </Drawer>
        </>
    );
}
