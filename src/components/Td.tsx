import * as React from 'react';

export default function Td(props: any) {

    return (
        <div>
            <td className='d-flex'>
                {props.children}
            </td>
        </div>
    );
}