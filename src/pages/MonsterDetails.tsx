import {Typography} from '@mui/material';
import _ from 'lodash';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Alignment,
    Campaign,
    CampaignType,
    Monster,
    MonstersClient, Size,
} from '../api/Model';
import {ApiType, useDnDApi} from '../api/dndDb';
import {FormSelect} from '../components/formInputs/FormSelect';
import {FormTextField} from '../components/formInputs/FormTextField';
import {useAuth} from '../hooks/useAuth';
import Details from '../layouts/Details';

interface MonsterDetailsProps {
}

const client = new MonstersClient();

export const MonsterDetails = ({}: MonsterDetailsProps) => {
    const {id: monsterId} = useParams<{ id: string }>();
    const navigate = useNavigate();

    client.setAuthToken(useAuth().token);

    const {
        loading,
        invoke,
        response: monster,
    } = useDnDApi((id: string) => client.getMonsterById(id, null, ''));

    useEffect(() => {
        if (monsterId) {
            invoke();
        }
    }, [monsterId]);

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<Monster>({
        defaultValues: {
            alignment: Alignment.None,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            armorClass: 0,
            hitPoints: 0
        }, mode: 'onBlur'
    });

    const updateMonster = async (payload: Monster) => {
        if (monsterId) {
        } else {
            await client.createMonster(payload);
            navigate(`/monsters`);
        }
    };

    return (
        <div>
            <div>
                <h1>{monster?.name ?? 'Create Monster'}</h1>
            </div>
            <form onSubmit={handleSubmit(updateMonster)}>
                <Controller
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
                />
                <input value="Create" type="submit"/>
            </form>
        </div>
    );
};
