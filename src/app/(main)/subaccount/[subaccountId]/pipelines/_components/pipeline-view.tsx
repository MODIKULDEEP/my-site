"use client"
import React, {useEffect, useState} from "react"
import {LaneDetail, PipelineDetailsWithLanesCardsTagsTickets} from "@/lib/types";
import {Lane, Ticket} from "@prisma/client";
import {useModal} from "@/providers/modal-provider";
import {useRouter} from "next/navigation";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import CustomModal from "@/components/global/custom-modal";
import LaneForm from "@/components/forms/lane-form";

type Props = {
    lanes: LaneDetail[]
    pipelineId: string
    subaccountId: string
    pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets
    updateLanesOrder: (lanes: Lane[]) => Promise<void>
    updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

const pipelineView = ({
                          lanes,
                          pipelineDetails,
                          pipelineId,
                          updateLanesOrder,
                          updateTicketsOrder,
                          subaccountId
                      }: Props) => {
    const {setOpen} = useModal()
    const router = useRouter()
    const [allLanes, setAllLanes] = useState<LaneDetail[]>([])

    useEffect(() => {
        setAllLanes(lanes)
    }, [lanes]);

    const handleAddLane = () => {
        setOpen(
            <CustomModal
                title=" Create A Lane"
                subheading="Lanes allow you to group tickets"
            >
                <LaneForm pipelineId={pipelineId}/>
            </CustomModal>
        )
    }

    return (
        <DragDropContext onDragEnd={() => {
        }}>
            <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{pipelineDetails?.name}</h1>
                    <Button
                        className="flex items-center gap-4"
                        onClick={handleAddLane}
                    >
                        <Plus size={15}/>
                        Create Lane
                    </Button>
                </div>
                <Droppable droppableId="lanes" type="lane" direction="horizontal" key="lanes">
                    {(provided) => (
                        <div className="flex items-center gap-x-2 overflow-scroll no-scrollbar" {...provided.droppableProps}
                             ref={provided.innerRef}>
                            <div className="flex mt-4">
                                {allLanes.map((lane, index)=>{
                                    <PipelineLane />
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default pipelineView