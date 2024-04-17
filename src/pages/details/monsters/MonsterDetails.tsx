import { APIReference, FEClient } from 'api/FE/fe.model';
import { useDnDApi } from 'api/dndDb';
import { Client, MonsterDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { PaginatedTable } from 'components/PaginatedTable/PaginatedTable';
import { TableColumn } from 'components/Table/Table.model';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { Loading } from 'components/loading/Loading';
import { useAuth } from 'hooks/useAuth';
import 'pages/details/Details.styles.scss';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { feToCampaignManagerMonsterMutator } from 'utils/dataAdapter';
import { monsterForm } from './MonsterDetails.form';

interface MonsterDetailsProps {}

const client = new Client();
const feClient = new FEClient();

export const MonsterDetails: FC<MonsterDetailsProps> = ({}) => {
  const [selectingMonster, setSelectingMonster] = useState<boolean>(false);

  const { id: campaignId, monsterId } = useParams<{
    id: string;
    monsterId?: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  console.log(`MonsterDetails.tsx:33 monsterId`, monsterId);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi(() =>
    client.monsters_GetMonsterById(monsterId ?? '', null, ''),
  );

  useEffect(() => {
    if (monsterId) {
      invoke();
    }
  }, [monsterId]);

  const form = useForm<Required<MonsterDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (monster) {
      reset(monster);
    }
  }, [monster]);

  const updateMonster = async (payload: MonsterDto) => {
    if (monsterId) {
      await client.monsters_UpdateMonsterPUT(monsterId, payload);
    } else {
      await client.monsters_CreateMonster(payload);
      navigate(`/compendium/monsters`);
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      {selectingMonster ? (
        <MonsterSelectTable
          onReturn={(monster?: MonsterDto) => {
            if (monster) {
              reset(monster);
            }
            setSelectingMonster(false);
          }}
        />
      ) : (
        <form
          onSubmit={handleSubmit(updateMonster)}
          className="form__main-container"
        >
          <div className="form__header">
            <h1>{monster?.name ?? 'Create Monster'}</h1>
            <Button styling="info" onClick={() => setSelectingMonster(true)}>
              From Monster
            </Button>
          </div>

          <div className="form__content">
            <GeneratedForm
              formBuilder={monsterForm}
              form={form}
              errors={formState.errors}
            />
          </div>

          <div className="form__footer">
            <div>
              <Button styling="success" type="submit">
                Create
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  ) : (
    <Loading />
  );
};

interface MonsterSelectTableProps {
  onReturn: (monster?: MonsterDto) => void;
}

const MonsterSelectTable: FC<MonsterSelectTableProps> = ({ onReturn }) => {
  const [fEMonsters, setFEMonsters] = useState<APIReference[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const collectOpenMonsters = async () => {
    setLoading(true);
    const { results } = await feClient.monsters();
    setFEMonsters(results);
    setLoading(false);
  };

  useEffect(() => {
    collectOpenMonsters();
  }, []);

  const columns: TableColumn<APIReference>[] = [
    {
      id: 'select',
      header: '',
      Render: ({ index }) => (
        <Button
          size="small"
          styling="success"
          onClick={() =>
            feClient
              .monsters2(index)
              .then((monster) =>
                onReturn(feToCampaignManagerMonsterMutator(monster)),
              )
          }
        >
          Select
        </Button>
      ),
    },
    { id: 'index', header: 'ID', accessor: ['index'] },
    { id: 'name', header: 'Name', accessor: ['name'] },
  ];

  return !loading ? (
    fEMonsters ? (
      <div className="form__main-container">
        <h1>Select Monster</h1>
        <PaginatedTable
          data={fEMonsters.map<APIReference & { id: string }>((monster) => ({
            ...monster,
            id: monster.index,
          }))}
          columns={columns}
        />
      </div>
    ) : (
      <>No Monsters Found</>
    )
  ) : (
    <Loading />
  );
};
