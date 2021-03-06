import factory from 'api/axiosFactory';
import { AxiosInstance, AxiosPromise } from 'axios';

class Client {
  public static delete(uri: string) {
    return Client.instance().delete(uri);
  }

  public static fetchNobt(identifier: string): AxiosPromise<NobtResponse> {
    return Client.instance().get(`nobts/${identifier}`);
  }

  public static createNobt(nobt: CreateNobtPayload) {
    return Client.instance().post('nobts', JSON.stringify(nobt), {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
  }

  public static createBill(identifier: string, bill: CreateBillPayload) {
    return Client.instance().post(
      `nobts/${identifier}/expenses`,
      JSON.stringify(bill),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  }

  private static axiosInstance: AxiosInstance | null = null;

  private static instance() {
    if (Client.axiosInstance === null) {
      Client.axiosInstance = factory(window.location.host);
    }

    return Client.axiosInstance;
  }
}

export interface NobtResponse {
  id: string;
  name: string;
  expenses: Expense[];
  deletedExpenses: Expense[];
  payments: any[];
  createdOn: string;
  participatingPersons: string[];
  currency: string;
  debts: Debt[];
}

export interface Debt {
  debtor: string;
  amount: number;
  debtee: string;
}

export interface Expense {
  id: number;
  name: string;
  debtee: string;
  splitStrategy: string;
  conversionInformation: {
    foreignCurrency: string;
    rate: number;
  };
  shares: Share[];
  date: string;
  deletedOn?: string;
  createdOn: string;
  _links?: {
    delete?: string;
  };
}

export interface Share {
  debtor: string;
  amount: number;
}

export interface CreateNobtPayload {
  nobtName: string;
  currency: string;
  explicitParticipants: [string];
}

export interface CreateBillPayload {
  name: string;
  debtee: string;
  splitStrategy: string;
  date: string;
  conversionInformation: {
    foreignCurrency: string;
    rate: number;
  };
  shares: [
    {
      debtor: string;
      amount: number;
    }
  ];
}

export default Client;
