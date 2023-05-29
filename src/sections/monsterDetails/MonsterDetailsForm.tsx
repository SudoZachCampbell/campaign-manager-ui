import {Controller, UseFormReturn} from "react-hook-form";
import {FormTextField} from "../../components/formInputs/FormTextField";
import {FormSelect} from "../../components/formInputs/FormSelect";
import {Alignment, Monster, MonsterType, Size} from "../../api/Model";
import _ from "lodash";

interface MonsterDetailsFormProps {
    form: UseFormReturn<Monster>;
}

export const MonsterDetailsForm = ({form: {control, formState: {errors}}}: MonsterDetailsFormProps) => {
    return (<div><Controller
        name="name"
        control={control}
        render={({field: {onChange, onBlur, name, value}}) => (
            <FormTextField
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
                label="Name"
            />
        )}
    />
        <Controller
            name="monsterType"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    options={Object.values(MonsterType).map((monsterType) => ({
                        value: monsterType.toString(),
                        label: _.startCase(monsterType.toString()),
                    }))}
                />
            )}
        />
        <Controller
            name="alignment"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    options={Object.values(Alignment).map((alignment) => ({
                        value: alignment.toString(),
                        label: _.startCase(alignment.toString()),
                    }))}
                />
            )}
        />
        <Controller
            name="strength"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Strength"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="dexterity"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Dexterity"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="constitution"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Constitution"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="intelligence"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Intelligence"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="wisdom"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Wisdom"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="charisma"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Charisma"
                    step="1"
                    type="number"
                    max="20"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="passivePerception"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Passive Perception"
                    step="1"
                    type="number"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="challengeRating"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Challenge Rating"
                    type="number"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="armorClass"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Armor Class"
                    step="1"
                    type="number"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="hitPoints"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Hit Points"
                    step="1"
                    type="number"
                    min="0"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="hitDice"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Hit Dice"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="size"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    options={Object.values(Size).map((size) => ({
                        value: size.toString(),
                        label: _.startCase(size.toString()),
                    }))}
                />
            )}
        />
        <Controller
            name="languages"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Languages"
                    errorsLookup={errors}
                />
            )}
        />
        <Controller
            name="proficiencies"
            control={control}
            render={({field: {onChange, onBlur, name, value}}) => (
                <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    label="Proficiencies"
                    errorsLookup={errors}
                />
            )}
        /></div>)
}