// import React, {useState, useEffect} from 'react';
// import {Box} from '@mui/material';
// import {Change} from './ListAdder';
// import {Patch} from '../../interfaces/Requests';
// import _ from 'lodash';
// import {ToggleType} from '../../interfaces/Lookups';
// import {TextField} from './TextField';
//
// interface ObjectField {
//     name: string;
//     desc: string;
// }
//
// interface ObjectsFieldProps {
//     value: ObjectField[];
//     label: string;
//     field: string;
//     outerSaveField?: Function;
//     noEdit?: boolean;
//     toggleType?: ToggleType;
// }
//
// export const ObjectsField = ({
//                                  value,
//                                  label,
//                                  field,
//                                  outerSaveField,
//                                  noEdit,
//                                  toggleType,
//                              }: ObjectsFieldProps) => {
//     const [currentItems, setCurrentItems] = useState<ObjectField[]>([]);
//
//     useEffect(() => {
//         setCurrentItems(value);
//     }, [value]);
//
//     const saveField = (changes: Change) => {
//         let patchList: Patch[] = [];
//         patchList = _.reduce(
//             changes,
//             (accum, changeValue, op) => {
//                 let opPatch = _.map(changeValue, (property, index) => {
//                     let patch: Patch = {
//                         op,
//                         path: `/${_.camelCase(field)}/${
//                             op === 'add' ? '-' : property.index
//                         }`,
//                     };
//                     if (op === 'add') {
//                         if (property['value']) {
//                             patch.value = property['value'];
//                         }
//                     }
//                     return patch;
//                 });
//                 return accum.concat(opPatch);
//             },
//             patchList,
//         );
//         // TODO: Remove warnings around nesting
//         if (patchList.length) {
//             outerSaveField && outerSaveField(field, patchList);
//         }
//     };
//
//     const returnField = () => {
//         switch (toggleType) {
//             case ToggleType.Enum:
//                 return;
//             case ToggleType.List:
//                 return;
//             case ToggleType.Text:
//                 return (
//                     <Box display='flex' flexDirection='column'>
//                         {currentItems?.map((instance) => {
//                             return (
//                                 <TextField
//                                     label={instance['name']}
//                                     value={instance['desc']}
//                                     field={field}
//                                 />
//                             );
//                         })}
//                     </Box>
//                 );
//             case ToggleType.Number:
//                 return;
//         }
//     };
//
//     // return (
//     //   <Label label={label} title column noEdit>
//     //     {returnField()}
//     //   </Label>
//     // );
// };
