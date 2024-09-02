<script setup>
import useRedis from "@/composables/redis";
import { onMounted } from "vue";

const { downloadJson, keys, getKeys } = useRedis();

onMounted(() => {
  getKeys();
});
</script>

<template>
  <div class="content-wrapper">
    
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>

          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card bg-gradient-dark">
                  <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-database mt-2"></i> API Json:</h3>
                    <table id="table1" class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Json Key</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="keys.length === 0">
                          <td colspan="3">Nothing but chickens here.</td>
                        </tr>
                        <tr v-else v-for="(keyItem, index) in keys" :key="index">
                          <td>{{ keyItem.key }}</td>
                          <td style="padding: 0; text-align: center;">
                            <a class="btn btn-app bg-success" @click="downloadJson(keyItem.key)">
                              <i class="fas fa-download"></i> Download Json
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

  </div>
</template>

