// We define the empty imports so the auto-complete feature works as expected.
import {} from '@dcl/sdk/math'
import {
    Animator,
    ColliderLayer,
    engine,
    GltfContainer,
    InputAction,
    MeshCollider,
    MeshRenderer,
    PointerEvents,
    pointerEventsSystem,
    PointerEventType,
    Transform
} from '@dcl/sdk/ecs'

import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'

export function main() {
    setupUi()
    changeColorSystem()

    const entity = engine.addEntity()
    MeshRenderer.setBox(entity)
    MeshCollider.setBox(entity)
    Transform.create(entity, { position: { x: 8, y: 1, z: 8 } })
    PointerEvents.create(entity, {
        pointerEvents: [

            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    showFeedback: true,
                    showHighlight:true,
                    hoverText: 'hoverText11',
                    maxDistance:2
                },
            },
            {
                eventType: PointerEventType.PET_UP,

                eventInfo: {
                    showFeedback: false,
                    button: InputAction.IA_POINTER,
                    hoverText: 'hoverText UP',

                },
            }
        ],
    })

    PointerEvents.createOrReplace(entity, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_JUMP,

                    showFeedback: true,
                    hoverText: 'hoverText1111',
                },
            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_SECONDARY,
                    showFeedback: true,
                    hoverText: 'hoverText2',
                },
            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    showFeedback: true,
                    hoverText: 'hoverText3',
                },
            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_ACTION_3,
                    showFeedback: true,
                    hoverText: 'hoverText4',
                },
            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_ACTION_5,
                    showFeedback: true,
                    hoverText: 'hoverTex5',
                },
            },
             {
                 eventType: PointerEventType.PET_DOWN,
                 eventInfo: {
                     button: InputAction.IA_ACTION_4,
                     showFeedback: true,
                     hoverText: 'hoverText6',
                 },
             },
            {
                 eventType: PointerEventType.PET_DOWN,
                 eventInfo: {
                     button: InputAction.IA_ACTION_6,
                     showFeedback: true,
                     hoverText: 'hoverText7',
                 },
             },
             {
                 eventType: PointerEventType.PET_DOWN,
                 eventInfo: {
                     button: InputAction.IA_FORWARD,
                     showFeedback: true,
                     hoverText: 'hoverText8',
                 },
             },
        ],
    })

    const aEntity = engine.addEntity()
    Transform.create(aEntity, { position: { x: 3, y: 0, z: 3 } })
    GltfContainer.create(aEntity, {
        src: "assets/models/airdrop.glb",
        visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    })
    pointerEventsSystem.onPointerDown(
        {
            entity: aEntity,
            // entity: dispenserButton,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: 'Open Drone',
                showFeedback: true,
                maxDistance: 10
            }
        },()=>{
            console.log("clicked")
        })
/*    PointerEvents.create(aEntity, {
        pointerEvents: [

            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    showFeedback: true,
                    hoverText: `- AIRDROP -`,
                },
            }
        ],
    })*/
    Animator.create(aEntity, {
        states: [
            {
                clip: 'Action_Ground',
                playing: false,
                loop: false,
                speed: 1.25
            },
            {
                clip: 'Idle_Fly',
                playing: true,
                loop: true,
                speed: 1
            },
            {
                clip: 'Idle_Ground',
                playing: false,
                loop: true,
                speed: 1
            },
            {
                clip: 'Landing',
                playing: false,
                loop: false,
                speed: 1
            }
        ]
    })
}
