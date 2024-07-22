import {generateComponents} from "@uploadthing/react";
import {generateReactHelpers} from "@uploadthing/react/hooks";
import type {OurFilerouter} from "@/app/api/uploadthing/core"

export const {UploadButton, UploadDropzone, Uploader} = generateComponents<OurFilerouter>()
export const {useUploadThing, UploadFiles} = generateReactHelpers<OurFilerouter>()

// import {generateUploadDropzone} from "@uploadthing/react";
// import type {OurFileRouter} from "@/app/api/uploadthing/core"
//
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();