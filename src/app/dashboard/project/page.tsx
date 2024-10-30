"use client"
import React, {useState} from 'react'
import {DashboardTemplate} from "@/app/components/templates/DashboardTemplate";
import Wrapper from "@/app/components/atoms/Wrapper";
import {ProjectSetting} from "@/app/components/organisms/form/ProjectSetting";
import {PrimaryButton} from "@/app/components/atoms/Button";
import {Modal} from "@/app/components/organisms/modal/Modal";

export default function ProjectPage() {
    const [modalSetting, setModalSetting] = useState<{ mode?: "edit" | "new", visible: boolean, record: undefined }>({
        mode: undefined,
        visible: false,
        record: undefined
    });
    const openNodal = (flag: boolean) => setModalSetting({
        ...modalSetting,
        visible: flag,
        mode: undefined
    })


    return (
        <DashboardTemplate title="Profile settings">
            <PrimaryButton onClick={() => setModalSetting({...modalSetting, mode: "new", visible: true})}
                           label={"Add project"}/>
            {modalSetting.visible && <Modal title={"Add new project"} setOpen={openNodal} open={modalSetting.visible}>
                <Wrapper>
                    <ProjectSetting/>
                </Wrapper>
            </Modal>}

        </DashboardTemplate>
    )
}
