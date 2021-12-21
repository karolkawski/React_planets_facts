import { Label } from "../atoms/Label";

export function DetailsRow(props) {
    const {attribute, content} = props;
    return (
        <div className="Details__Row">
            <Label size={'S'} text={attribute}/>
            <Label size={'M'} text={content}/>
        </div>
    )

}