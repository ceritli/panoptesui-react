import { DataSourceRequest, DataSourceResult } from './types';

export interface DataSourceConfig {
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
}

export class PanoptesDataSource<T = any> {
  private config: DataSourceConfig;

  constructor(config: DataSourceConfig) {
    this.config = {
      method: 'POST',
      ...config
    };
  }

  async fetch(request: DataSourceRequest): Promise<DataSourceResult<T>> {
    if (this.config.method === 'GET') {
      const query = new URLSearchParams({
        page: request.page.toString(),
        pageSize: request.pageSize.toString()
      });

      if (request.sorts && request.sorts.length > 0) {
        query.set('sort', request.sorts.map(s => `${s.field}:${s.dir}`).join(','));
      }

      if (request.filter) {
        query.set('filter', JSON.stringify(request.filter));
      }

      const res = await fetch(`${this.config.url}?${query.toString()}`, {
        headers: this.config.headers
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } else {
      const res = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...this.config.headers
        },
        body: JSON.stringify(request)
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    }
  }
}
