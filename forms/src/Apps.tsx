import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import './App.css';

function App() {
  const form = useRef(null);
  const [registers, setRegisters] = useState<Register[]>([]);
  const [registerBeingEditted, setRegisterBeingEditted] = useState<string>();

  interface Register {
    uuid: string;
    tamanhoLoteMinimo: string;
    leadTime: string;
    estoqueDeSeguranca: string;
    quantidadeDaReceita: string;
    estoqueInicial: string;
  }

  interface CustomFormTargetValues {
    tamanhoLoteMinimo: { value: string };
    leadTime: { value: string };
    estoqueDeSeguranca: { value: string };
    quantidadeDaReceita: { value: string };
    estoqueInicial: { value: string };
  }

  function generateUUID(): string {
    return v4();
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as typeof e.target & CustomFormTargetValues;

    const register: Register = {
      uuid: registerBeingEditted ? registerBeingEditted : generateUUID(),
      tamanhoLoteMinimo: target.tamanhoLoteMinimo.value,
      leadTime: target.leadTime.value,
      estoqueDeSeguranca: target.estoqueDeSeguranca.value,
      quantidadeDaReceita: target.quantidadeDaReceita.value,
      estoqueInicial: target.estoqueInicial.value,
    };

    if (registerBeingEditted) {
      const mutableRegisters: Register[] = [...registers];
      const index = mutableRegisters.findIndex(
        (reg) => reg.uuid === registerBeingEditted,
      );
      mutableRegisters.splice(index, 1, register);
      setRegisters(mutableRegisters);
    } else {
      setRegisters((prev) => [...prev, register]);
    }
  }

  function editRegister(index: number) {
    const register = registers[index];
    setRegisterBeingEditted(register.uuid);

    if (form.current) {
      Object.entries(register).forEach(([name, value]) => {
        // @ts-ignore
        if (form.current[name]) form.current[name].value = value;
      });
    }
  }

  function stopEditting() {
    setRegisterBeingEditted('');
    // @ts-ignore
    if (form.current) form.current.reset();
  }

  const isThisBeingEditting = (index: number) =>
    registers[index].uuid === registerBeingEditted;

  function deleteRegister(index: number) {
    const mutableRegisters: Register[] = [...registers];
    mutableRegisters.splice(index, 1);
    localStorage.setItem('registers', JSON.stringify(mutableRegisters));
    setRegisters(mutableRegisters);
  }

  useEffect(() => {
    if (registers.length) {
      localStorage.setItem('registers', JSON.stringify(registers));
    }
  }, [registers]);

  useEffect(() => {
    const storedRegisters = localStorage.getItem('registers');
    if (storedRegisters) setRegisters(JSON.parse(storedRegisters));
  }, []);

  return (
    <>
      <div className="container">
        <form ref={form} onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="tamanhoLoteMinimo">Tamanho Lote Mínimo</label>
          <input
            required
            id="tamanhoLoteMinimo"
            name="tamanhoLoteMinimo"
            type="text"
          />
          <label htmlFor="leadTime">Lead Time</label>
          <input required id="leadTime" name="leadTime" type="text" />
          <label htmlFor="estoqueDeSeguranca">Estoque de segurança</label>
          <input
            required
            id="estoqueDeSeguranca"
            name="estoqueDeSeguranca"
            type="text"
          />
          <label htmlFor="quantidadeDaReceita">Quantidade da "receita"</label>
          <input
            required
            id="quantidadeDaReceita"
            name="quantidadeDaReceita"
            type="text"
          />
          <label htmlFor="estoqueInicial">Estoque inicial</label>
          <input
            required
            id="estoqueInicial"
            name="estoqueInicial"
            type="text"
          />
          <div id="buttons">
            {registerBeingEditted && (
              <button id="stopEditting" onClick={stopEditting}>
                Sair da edição
              </button>
            )}
            <button type="submit">
              {registerBeingEditted
                ? 'salvar alterações'
                : 'salvar novo registro'}
            </button>
          </div>
        </form>
      </div>

      {!registers.length ? null : (
        <table>
          <thead>
            <tr>
              <td>tamanhoLote Mínimo</td>
              <td>lead Time</td>
              <td>estoque De Segurança</td>
              <td>quantidade Da Receita</td>
              <td>estoque Inicial</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            {registers.map((register, index) => (
              <tr key={`${register.tamanhoLoteMinimo}-${index}`}>
                <td>{register.tamanhoLoteMinimo}</td>
                <td>{register.leadTime}</td>
                <td>{register.estoqueDeSeguranca}</td>
                <td>{register.quantidadeDaReceita}</td>
                <td>{register.estoqueInicial}</td>
                <td>
                  <div id="actionButtons">
                    <button
                      onClick={() => editRegister(index)}
                      disabled={isThisBeingEditting(index)}
                    >
                      {isThisBeingEditting(index) ? 'EDITANDO' : 'EDITAR'}
                    </button>
                    <button onClick={() => deleteRegister(index)}>
                      EXCLUIR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
