<script setup>
import useUsers from "@/composables/users";
import { onMounted, computed } from "vue";

const { users, getUsers, authorizeUser } = useUsers();

onMounted(() => {
  getUsers();
});

// const clientlists = computed(() => users.value.filter(user => user.role !== 'admin' && user.has_token === 'No'));
</script>

<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Authorize Client</h1>
          </div>

          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Authorize Client</li>
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
                    <h3 class="card-title"><i class="fas fa-user mt-2"></i> Clients:</h3>
                    <table id="table1" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Has Token</th>
                        <th>Authorization Request</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="users.length === 0">
                        <td colspan="7">Nothing but chickens here.</td>
                      </tr>
                      <tr v-else v-for="user in users" :key="user.id">
                        <td class="text-center sorting_1">
                          <span v-if="user.role" class="right badge p-2 badge-success">{{ user.role }}</span>
                          <span v-else class="right badge p-2 badge-danger">NULL</span>
                        </td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.token_status }}</td>
                        <td>{{ user.has_token }}</td>
                        <td> <div class="btn-group">
                            <a class="btn btn-app bg-success" @click="authorizeUser(user.id)" style="margin-left: 100px;">
                              <i class="fas fa-user-check"></i> Authorize
                            </a>
                            <!-- <UpdateTickets :ticket="ticket" :id="String(ticket.id)" /> -->
                            <button class="btn btn-app bg-danger" style="margin-left: 20px;">
                              <i class="fas fa-ban"></i> Cancel
                            </button>
                          </div>
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

<style scoped></style>
